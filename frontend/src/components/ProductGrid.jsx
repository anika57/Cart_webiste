import React from 'react';
import { addToCart } from '../api';

export default function ProductGrid({ products = [], onCartUpdate }) {

  const handleAdd = async (id) => {
    try {
      await addToCart(id, 1);
      onCartUpdate();
    } catch (e) {
      alert('Failed to add to cart');
      console.error(e);
    }
  };

  if (!products || products.length === 0) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="products">
      <h2>Products</h2>
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <img
              src={p.image}
              alt={p.name}
            />
            <div className="card-body">
              <h4>{p.name}</h4>
              <p>{p.description || 'No description available'}</p>
              <div className="row">
                <strong>₹{p.price}</strong>
                <button onClick={() => handleAdd(p.id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
