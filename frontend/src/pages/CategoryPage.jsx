import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadCategory = async () => {
      const res = await fetch(`${API_URL}/api/category/${category}?limit=100`);
      const data = await res.json();
      setProducts(data.products);
    };
    loadCategory();
  }, [category, API_URL]);

  return (
    <div className="category-page">
      <h1>{category.toUpperCase()}</h1>

      <div className="category-grid">
        {products.map((p) => (
          <div 
            key={p.id}
            className="category-card"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img src={p.thumbnail} alt={p.title} />
            <p>{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
