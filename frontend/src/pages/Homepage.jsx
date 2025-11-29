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

  const fetchData = async (category, setter) => {
    try {
      const res = await fetch(`${REACT_APP_API_URL}/api/category/${category}?limit=100`);
      const data = await res.json();
      setter(data.products || []);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  useEffect(() => {
    fetchData("smartphones", setSmartphones);
    fetchData("laptops", setLaptops);
    fetchData("tablets", setTablets);
    fetchData("lighting", setLighting);
  }, []);

  const renderCategory = (title, category, products) => (
    <div className="category-section">
      <div className="category-header">
        <h2>{title}</h2>

        <button
          className="see-all-btn"
          onClick={() => navigate(`/category/${category}`)}
        >
          See All
        </button>
      </div>

      <div className="product-row">
        {products.map((p) => (
          <div
            key={p.id}
            className="product-card"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img src={p.thumbnail} alt={p.title} />
            <p>{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="homepage-container">
      <h1>Welcome to SmartPick</h1>

      {renderCategory("Smartphones", "smartphones", smartphones)}
      {renderCategory("Laptops", "laptops", laptops)}
      {renderCategory("Tablets", "tablets", tablets)}
      {renderCategory("Lighting", "lighting", lighting)}
    </div>
  );
}
