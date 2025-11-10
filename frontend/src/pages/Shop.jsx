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


      <div className="product-grid">
        {[
          { id: 1, name: 'Wireless Headphones', price: '₹2,499' },
          { id: 2, name: 'Smart Watch', price: '₹3,999' },
          { id: 3, name: 'Gaming Mouse', price: '₹1,299' },
        ].map((item) => (
          <div key={item.id} className="product-card">
            <div className="product-img"></div>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
