⚪️ AI-Powered E-Commerce Platform
Full-Stack MERN + Prisma + Gemini AI Chatbot

This project is a full-stack e-commerce platform built with React, Node.js, Express, Prisma, and Gemini AI.
Users can browse categories, view products, manage their cart, authenticate securely, and chat with an AI chatbot that answers product-related questions.

⚪️ Features
⚪️ Frontend (React)

Product Categories

Product Detail Pages

Cart Management (Context API)

User Login / Signup

AI Chatbot Interface

Fully responsive UI

⚪️ Backend (Node + Express + Prisma)

JWT Authentication (Signup, Login, Logout, Delete Account)

Prisma ORM with PostgreSQL / MySQL

Product & Category APIs

AI Chat Route Integrated with Gemini AI

Secure Auth Middleware

⚪️ AI Chatbot (Gemini)

Uses Google’s Gemini 2.0 Flash model

Maintains conversation history

Specialized for answering product-related questions

Clean role-based message formatting

⚪️ Project Structure
/backend
  ├── routes/
  │    ├── auth.js
  │    ├── chat.js
  │    ├── category.js
  │    ├── product.js
  │    └── add.js
  ├── prisma/
  │    └── schema.prisma
  ├── middleware/
  │    └── authMiddleware.js
  ├── server.js
  └── package.json

/frontend
  ├── src/
  │    ├── pages/
  │    ├── context/
  │    ├── components/
  │    ├── Chat.jsx
  │    ├── App.js
  │    └── index.js
  ├── public/
  └── package.json

⚪️ Authentication Flow
Signup
POST /api/auth/signup


Hashes password with bcrypt

Stores user via Prisma

Returns JWT

Login
POST /api/auth/login


Validates credentials

Returns JWT + user info

Delete Account
DELETE /api/auth/delete-account


Protected route

Removes user using Prisma

⚪️ AI Chat Route
Backend: /api/chat
router.post("/chat", async (req, res) => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const history = req.body.history || [];
  const userMessage = req.body.message;

  // Allow only USER messages to be sent to Gemini
  const filteredHistory = history.filter(h => h.role === "user");

  const chat = model.startChat({
    history: filteredHistory.map(h => ({
      role: "user",
      parts: h.parts
    }))
  });

  const result = await chat.sendMessage(userMessage);
  const text = await result.response.text();

  res.json({ reply: text });
});

⚪️ Frontend Chat Component

Chat.jsx sends history + message:

const response = await fetch(`${REACT_APP_API_URL}/api/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ history: chatHistory, message: value }),
});


And stores:

setChatHistory(prev => [
  ...prev,
  { role: "user", parts: [{ text: value }] },
  { role: "model", parts: [{ text: data.reply }] }
]);

⚪️ Environment Variables
Backend (.env)
DATABASE_URL=your_db_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key
PORT=5001

Frontend (.env)
REACT_APP_API_URL=http://localhost:5001

🏁 Running the Project
Install dependencies
cd backend && npm install
cd frontend && npm install

Start Backend
npm start

Start Frontend
npm start

⚪️ Deployment Notes
Frontend

Deploy on Vercel / Netlify

Backend

Deploy on:

Render

Railway

Vercel Serverless Functions

AWS / GCP / Azure

⚪️ Future Improvements

Product search with AI

Product recommendations

Vector embeddings for semantic queries

Admin dashboard

Order management
