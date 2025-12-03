import express from "express";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const history = req.body.history || [];
  const userMessage = req.body.message;

  try {
    // Inject a SYSTEM instruction as the FIRST message but using "user" role (Gemini requirement)
    const systemInstruction = {
      role: "user",
      parts: [
        {
          text: `
You are an electronics product expert chatbot.

RULES:
1. You must answer ONLY electronics-product-related questions (mobiles, laptops, appliances, etc).
2. If the question is NOT related to electronics, respond ONLY with:
   {
     "error": "Please ask only electronics-related questions."
   }
3. ALWAYS respond in the following JSON structure:

{
  "answer": "Main response here",
  "product_details": {
    "category": "",
    "features": [],
    "price_info": "",
    "buying_advice": ""
  }
}

4. NEVER include anything outside the JSON.
5. KEEP RESPONSES CLEAR AND CONCISE.

Follow these rules STRICTLY.
`
        }
      ]
    };

    const formattedHistory = [systemInstruction, ...history];

    const chat = model.startChat({
      history: formattedHistory
    });

    const result = await chat.sendMessage(userMessage);
    const text = await result.response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("Chat error details:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: error.stack
    });
  }
});

export default router;
