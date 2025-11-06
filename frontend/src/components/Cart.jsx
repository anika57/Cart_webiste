import React from 'react';
import { deleteCartItem, updateCartItem } from '../api';

export default function Cart({ cart = { items: [], total: 0 }, onCartChange, onCheckout }) {

  const handleRemove = async (id) => {
    if (!window.confirm('Remove item?')) return;
    await deleteCartItem(id);
    onCartChange();
  };

  const handleQty = async (item, delta) => {
    const newQty = item.qty + delta;
    if (newQty <= 0) {
      if (window.confirm('Quantity 0 — remove item?')) {
        await deleteCartItem(item.id);
        onCartChange();
      }
      return;
    }
    await updateCartItem(item.id, newQty);
    onCartChange();
  };

  return (
    <aside className="cart">
      <h2>Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.items.map(it => (
              <li key={it.id} className="cart-item">
                <img src={it.image} alt={it.name} />
                <div className="meta">
                  <div>{it.name}</div>
                  <div>₹{it.price} × {it.qty} = ₹{it.lineTotal}</div>
                  <div className="controls">
                    <button onClick={() => handleQty(it, -1)}>-</button>
                    <button onClick={() => handleQty(it, +1)}>+</button>
                    <button className="remove-btn" onClick={() => handleRemove(it.id)}>Remove</button>
                  </div>

                </div>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <div>Total: <strong>₹{cart.total}</strong></div>
            <button onClick={onCheckout}>Checkout</button>
          </div>
        </>
      )}
    </aside>
  );
}
