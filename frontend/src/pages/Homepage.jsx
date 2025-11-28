import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="homepage-container">
      <button className="ask-ai-btn" onClick={goToChat}>
        Ask AI
      </button>

      <h1>Welcome to the Homepage</h1>
      <p>This is the main landing page of the application.</p>
    </div>
  );
}
