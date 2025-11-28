import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const [smartphones, setSmartphones] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [lighting, setLighting] = useState([]);

  const goToChat = () => {
    navigate("/chat");
  };

  // Fetch categories from backend
  const fetchData = async (category, setter) => {
    try {
      const res = await fetch(`${REACT_APP_API_URL}/api/category/${category}`);
      const data = await res.json();

      setter(data.products || []); // save into state
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  // when page loads, fetch all categories
  useEffect(() => {
    fetchData("smartphones", setSmartphones);
    fetchData("laptops", setLaptops);
    fetchData("tablets", setTablets);
    fetchData("lighting", setLighting);
  }, []);

  return (
    <div className="homepage-container">
      <button className="ask-ai-btn" onClick={goToChat}>
        Ask AI
      </button>

      <h1>Welcome to the SmartPick</h1>

      {/* smartphones section */}
      <h2>Smartphones</h2>
      <div className="product-row">
        {smartphones.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.thumbnail} alt={p.title} />
            <p>{p.title}</p>
          </div>
        ))}
      </div>

      {/* laptops section */}
      <h2>Laptops</h2>
      <div className="product-row">
        {laptops.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.thumbnail} alt={p.title} />
            <p>{p.title}</p>
          </div>
        ))}
      </div>

      {/* tablets section */}
      <h2>Tablets</h2>
      <div className="product-row">
        {tablets.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.thumbnail} alt={p.title} />
            <p>{p.title}</p>
          </div>
        ))}
      </div>

      {/* lighting section */}
      <h2>Lighting</h2>
      <div className="product-row">
        {lighting.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.thumbnail} alt={p.title} />
            <p>{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
