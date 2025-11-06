// frontend/src/api.js
const API_URL = 'http://localhost:5000';

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_URL}/api/cart`);
  return res.json();
}

export async function addToCart(productId, qty = 1) {
  const res = await fetch(`${API_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty })
  });
  return res.json();
}

export async function deleteCartItem(id) {
  const res = await fetch(`${API_URL}/api/cart/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function updateCartItem(id, qty) {
  const res = await fetch(`${API_URL}/api/cart/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ qty })
  });
  return res.json();
}

export async function checkout(payload) {
  const res = await fetch(`${API_URL}/api/checkout`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}
