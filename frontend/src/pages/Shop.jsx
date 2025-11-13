import React from 'react';
import './Shop.css';
import { useLocation } from 'react-router-dom';

export default function Shop() {
  const location = useLocation();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const userName = location.state?.userName || "Guest";

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>🛍️ SmartPick Store</h1>
        <p>Welcome, {userName}!</p>
      </header>

      
    </div>
  );
}
