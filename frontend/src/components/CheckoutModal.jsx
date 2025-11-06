import React, { useState } from 'react';
import { checkout } from '../api';

export default function CheckoutModal({ cart, onClose, onDone }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert('Provide name and email');
    setLoading(true);
    try {
      // send cart items and user info
      const payload = { cartItems: cart.items, name, email };
      const res = await checkout(payload);
      if (res && res.receipt) {
        onDone(res.receipt);
      } else {
        alert('Checkout failed');
      }
    } catch (err) {
      console.error(err);
      alert('Checkout error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-inner">
        <h3>Checkout</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <div className="summary">
            <div>Items: {cart.items.length}</div>
            <div>Total: ₹{cart.total}</div>
          </div>
          <div className="actions">
            <button type="submit" disabled={loading}>Pay (mock)</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
