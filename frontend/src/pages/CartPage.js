import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, increment, decrement, clearCart } = useContext(CartContext);

  return (
    <div>
      <h1>Cart Page</h1>
      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map(item => (
        <div
          key={item.id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>


          <button onClick={() => increment(item.id)}>+</button>
          <button onClick={() => decrement(item.id)}>-</button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <button onClick={clearCart} style={{ marginTop: "20px" }}>
          Clear Cart
        </button>
      )}
    </div>
  );
}
