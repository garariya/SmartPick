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
You are an AI assistant that ONLY answers questions about electronic products.
Allowed topics: smartphones, laptops, headphones, speakers, smartwatches, TVs, gaming, PC parts, gadgets.

If a question is unrelated to electronics, respond with:
"I can only answer questions related to electronic products."

For valid electronic questions, respond in this EXACT structured format:

**Overview**
• short 1-2 line explanation

**Key Specs**
• bullet 1
• bullet 2
• bullet 3

**Pros**
• bullet 1
• bullet 2
• bullet 3

**Cons**
• bullet 1
• bullet 2
• bullet 3

**Price Range**
• approximate range

**Verdict**
• short recommendation

DO NOT use long paragraphs. ALWAYS use bullet points.
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
