import React, { useEffect, useState , useContext} from 'react'
import { useParams } from 'react-router-dom'
import "./ProductPage.css";
import { CartContext } from '../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const {addToCart} = useContext(CartContext);

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
      
      <div className="product-layout">
        

        <div className="product-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>
  

        <div className="product-details">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h3 className="price">Price: ${product.price}</h3>
  
          <div className="product-actions">
            <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
  
      </div>
  

      <div className="product-reviews">
        <h2>Customer Reviews</h2>
  
        {product?.reviews?.length > 0 ? (
          product.reviews.map((r, index) => (
            <div className="review-card" key={index}>
              <h4>{r.user}</h4>
              <p>{r.comment}</p>
              <span>⭐ {r.rating}</span>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
  
    </div>
  );
  
}

export default ProductPage;
