// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { fetchProducts, getCart } from './api';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import './index.css';
import { addToCart } from './api';


export default function App() {
  const [products, setProducts] = useState([]);
  const [cartSummary, setCartSummary] = useState({ items: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const loadProducts = async () => setProducts(await fetchProducts());
  const loadCart = async () => setCartSummary(await getCart());

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* ✅ NAVBAR */}
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/" className="logo">VibeWear</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </div>
          <div className="nav-right">
            <Link to="/cart" className="cart-icon">
              🛒
              {cartSummary.items.length > 0 && (
                <span className="cart-badge">{cartSummary.items.length}</span>
              )}
            </Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Hero products={products} onCartUpdate={loadCart}/>} />
            <Route
              path="/products"
              element={<ProductGrid products={products} onCartUpdate={loadCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cartSummary}
                  onCartChange={loadCart}
                  onCheckout={() => setShowCheckout(true)}
                />
              }
            />
          </Routes>

          {showCheckout && (
            <CheckoutModal
              cart={cartSummary}
              onClose={() => setShowCheckout(false)}
              onDone={(r) => {
                setReceipt(r);
                setShowCheckout(false);
                loadCart();
              }}
            />
          )}

          {receipt && (
  <div className="receipt">
    <h3>Receipt</h3>
    <div className="receipt-details">
      <p><strong>Order ID:</strong> {receipt.id}</p>
      <p><strong>Name:</strong> {receipt.name}</p>
      <p><strong>Email:</strong> {receipt.email}</p>
      <p><strong>Date:</strong> {new Date(receipt.createdAt).toLocaleString()}</p>

      <h4>Items:</h4>
      <ul>
        {receipt.items?.map((item, idx) => (
          <li key={idx}>
            {item.name} x {item.quantity} — ₹{item.price * item.quantity}
          </li>
        )) || <li>No items found</li>}
      </ul>

      <p><strong>Total:</strong> ₹{receipt.total.toFixed(2)}</p>
    </div>
    <button className="btn-close" onClick={() => setReceipt(null)}>Close</button>
  </div>
)}

        </main>

        {/* ✅ FOOTER */}
        <footer className="footer">
          <p>© 2025 VibeWear | Designed with ❤️ for fashion lovers</p>
          <div className="socials">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

//Hero section
const Hero = ({ products = [], onCartUpdate }) => (
  <>
    {/* Hero Banner */}
    <section className="hero">
      <div className="hero-content">
        <h1>Stay Cool. Stay Vibe.</h1>
        <p>Trendy streetwear that defines your mood.</p>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
      <img
        src="https://images.pexels.com/photos/7202789/pexels-photo-7202789.jpeg"
        alt="hero"
        className="hero-img"
      />
    </section>

    {/* Featured Products */}
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.slice(0, 3).map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.description || 'No description available'}</p>
              <div className="product-footer">
                <strong>₹{p.price}</strong>
                <button
                  onClick={async () => {
                    await addToCart(p.id, 1);
                    onCartUpdate();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading featured products...</p>
        )}
      </div>
      <Link to="/products" className="btn-secondary">View All Products</Link>
    </section>

    {/* Testimonials */}
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-cards">
        <div className="testimonial">"Amazing quality! Totally in love ❤️"</div>
        <div className="testimonial">"Fast delivery and great style."</div>
      </div>
    </section>

    {/* Newsletter */}
    <section className="newsletter">
      <h2>Join Our Newsletter</h2>
      <p>Get updates on new arrivals, offers, and style tips.</p>
      <input type="email" placeholder="Your email" />
      <button className="btn-primary">Subscribe</button>
    </section>
  </>
);
