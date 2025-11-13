import express from "express"
import "dotenv/config";
import {GoogleGenerativeAI} from "@google/generative-ai";

const router = express.Router();
const ai = new GoogleGenerativeAI({apiKey: process.env.GEMINI_API_KEY});

const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
// CHAT ROUTE
router.get("/chat", (req,res)=>{
  
})