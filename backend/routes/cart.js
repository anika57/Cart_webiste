// backend/routes/cart.js
const express = require('express');
const router = express.Router();
const { db } = require('../db');

// Add to cart
router.post('/', (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });

  // If same product exists, update qty
  db.get("SELECT id, qty FROM cart WHERE productId = ?", [productId], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const now = new Date().toISOString();
    if (row) {
      const newQty = row.qty + qty;
      db.run("UPDATE cart SET qty = ?, addedAt = ? WHERE id = ?", [newQty, now, row.id], function(err){
        if (err) return res.status(500).json({ error: 'DB update error' });
        res.json({ id: row.id, productId, qty: newQty });
      });
    } else {
      db.run("INSERT INTO cart (productId, qty, addedAt) VALUES (?, ?, ?)", [productId, qty, now], function(err){
        if (err) return res.status(500).json({ error: 'DB insert error' });
        res.json({ id: this.lastID, productId, qty });
      });
    }
  });
});

// Get cart + total
router.get('/', (req, res) => {
  const sql = `
    SELECT c.id as cartId, c.productId, c.qty, p.name, p.price, p.image
    FROM cart c
    LEFT JOIN products p ON p.id = c.productId
  `;
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    let total = 0;
    const items = rows.map(r => {
      const lineTotal = (r.price || 0) * r.qty;
      total += lineTotal;
      return {
        id: r.cartId,
        productId: r.productId,
        name: r.name,
        price: r.price,
        qty: r.qty,
        image: r.image,
        lineTotal: Number(lineTotal.toFixed(2))
      };
    });
    res.json({ items, total: Number(total.toFixed(2)) });
  });
});

// Delete cart item
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM cart WHERE id = ?", [id], function(err){
    if (err) return res.status(500).json({ error: 'DB error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  });
});

// Update qty for a cart item (optional route used by frontend)
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { qty } = req.body;
  if (typeof qty !== 'number') return res.status(400).json({ error: 'qty required as number' });
  db.run("UPDATE cart SET qty = ? WHERE id = ?", [qty, id], function(err){
    if (err) return res.status(500).json({ error: 'DB error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  });
});

module.exports = router;
