// backend/routes/checkout.js
const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.post('/', (req, res) => {
  const { cartItems, name, email } = req.body;
  if (!Array.isArray(cartItems) || !name || !email) {
    return res.status(400).json({ error: 'cartItems, name and email are required' });
  }

  // calculate total from sent cartItems to avoid trusting client blindly
  let total = 0;
  cartItems.forEach(i => {
    const price = Number(i.price || 0);
    const qty = Number(i.qty || 0);
    total += price * qty;
  });
  total = Number(total.toFixed(2));
  const createdAt = new Date().toISOString();

  const payload = JSON.stringify({ cartItems });

  db.run("INSERT INTO receipts (total, payload, name, email, createdAt) VALUES (?, ?, ?, ?, ?)",
    [total, payload, name, email, createdAt],
    function(err){
      if (err) return res.status(500).json({ error: 'DB error' });
      const receipt = {
        id: this.lastID,
        total,
        name,
        email,
        createdAt
      };

      // Optionally clear the cart (simulate checkout)
      db.run("DELETE FROM cart", [], (err2) => {
        if (err2) console.warn('Failed to clear cart', err2);
        res.json({ receipt });
      });
    });
});

module.exports = router;
