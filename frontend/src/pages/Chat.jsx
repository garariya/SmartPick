import React, { useState } from "react";

export default function Chat() {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; // e.g., http://localhost:5001/api/chat
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleGenerate = async () => {
    if (!value.trim()) return; 
    try {
      const response = await fetch(`${REACT_APP_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: chatHistory, message: value }),
      });

      const data = await response.json(); 


      setChatHistory([
        ...chatHistory,
        { role: "user", content: value },      
        { role: "model", content: data.reply } 
      ]);

      setValue("");
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <div>
      <section className="search-section">
        <h2>Ask AI</h2>

        <input
          placeholder="Ask anything about product?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()} // optional: send on Enter
        />

        <button onClick={handleGenerate}>Generate</button>
        

        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={chat.role === "user" ? "user-message" : "model-message"}
            >
              <p>{chat.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
