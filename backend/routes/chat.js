import express from "express";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

// CHAT ROUTE
router.post("/chat", async (req, res) => {  
  const history = req.body.history;
  const userMessage = req.body.message;

  try {
    const chat = await model.startChat({
      history: history || []
    });

    const message = await chat.sendMessage(userMessage);
    const response = await message.text();
    res.json({ reply: response });
  } catch (error) {
    console.error("Chat error details:", error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
      stack: error.stack
    });
  }
});

export default router;  