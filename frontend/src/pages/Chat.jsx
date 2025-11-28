import React, { useState } from "react";
import "./Chat.css";

export default function Chat() {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
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
      console.log(data)


      setChatHistory(chatHistory=> [
        ...chatHistory,
        { role: "user", parts: [{text: value}]},      
        { role: "model", parts: [{text: data.reply}] } 
      ]);

      setValue("");
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <div className="chat-wrapper">
  

      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={chat.role === "user" ? "user-message" : "model-message"}
          >
            <p>{chat.role} : {chat.parts[0].text}</p>
          </div>
        ))}
      </div>
  

      <div className="input-bar">
        <input
          placeholder="Ask anything about product?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />
  
        <button onClick={handleGenerate}>Send</button>
      </div>
    </div>
  );
  
}
