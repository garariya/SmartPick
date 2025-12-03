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
    const systemInstruction = {
      role: "user",
      parts: [
        {
          text: `
Your job:
1. You ONLY answer questions related to ELECTRONIC PRODUCTS.
2. If user asks anything outside electronics, reply:
   "Please ask only electronic-product-related questions."

3. ALWAYS respond in EXACTLY this JSON structure:

{
  "answer": "... your natural-language answer about electronics ...",
  "product_details": {
    "category": "",
    "features": [],
    "price_info": "",
    "buying_advice": ""
  }
}

Rules:
- Do NOT include markdown.
- Do NOT add extra fields.
- Always return VALID JSON only.
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
