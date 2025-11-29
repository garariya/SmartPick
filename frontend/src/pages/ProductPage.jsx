import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`${REACT_APP_API_URL}/api/product/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error("Product fetch error:", e);
      }
    };

    loadProduct();
  }, [id]);


  if (!product) {
    return (
      <div className="product-page">
        <h1>Loading product...</h1>
      </div>
    );
  }

  
  return (
    <div className="product-page">
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
    </div>
  );
}

export default ProductPage;
