import express from "express";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";


const router = express.Router();


const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// CHAT ROUTE
router.post("/chat", async (req, res) => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
  const history = req.body.history || [];
  const userMessage = req.body.message;

  try {
    const chat = model.startChat((history || []).map(h => ({
      role: h.role,
      parts: h.parts
    })));

    const result = await chat.sendMessage(userMessage);
    console.log("AI response:", result.response.text());
    const text = await result.response.text();

    res.json({ reply: text });

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