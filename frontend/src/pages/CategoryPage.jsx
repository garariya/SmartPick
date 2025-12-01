import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { category } = useParams();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadCategory = async () => {
      const res = await fetch(`${REACT_APP_API_URL}/api/category/${category}`);
      const data = await res.json();
      setProducts(data.products);
    };
    loadCategory();
  }, [category]);

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
