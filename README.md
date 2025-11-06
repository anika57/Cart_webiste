

# Mock E-Commerce Cart

A **full-stack shopping cart application** built for Vibe Commerce screening.
Technologies used: **React** (frontend), **Node.js + Express** (backend), **SQLite** (database).

The app supports:

* Product listing
* Add/remove items from cart
* Update quantities
* Mock checkout with receipt
* Responsive design
* Error handling and mock user persistence

---

## 📂 Project Structure

```
/backend      # Node.js + Express API with SQLite DB
/frontend     # React frontend
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd <your-repo-folder>
```

---

### 2. Backend Setup

1. Go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create the SQLite database (if not included):

```bash
node initDb.js
```

4. Start the backend server:

```bash
node server.js
```

* The backend runs at: `http://localhost:5000`
* API Endpoints:

  * `GET /api/products` → list products
  * `POST /api/cart` → add to cart
  * `DELETE /api/cart/:id` → remove from cart
  * `GET /api/cart` → view cart
  * `POST /api/checkout` → checkout & get receipt

---

### 3. Frontend Setup

1. Go to the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

* The frontend runs at: `http://localhost:3000`
* Features:

  * Hero section with featured products
  * Products page with Add to Cart
  * Cart page with quantity/update/remove options
  * Checkout modal with receipt display
  * Responsive design for mobile/tablet

---

## 🎯 Features

* **Products:** List of items with images, name, price, and description
* **Cart:** Add/remove/update products; view total
* **Checkout:** Enter name/email, generate mock receipt
* **Error handling:** Backend returns proper status codes; frontend handles failed requests
* **Mock user persistence:** All carts tied to `userId = 1` for demo
* **Responsive:** Works on desktop, tablet, and mobile

---

## 🖼 Screenshots

**Home Page / Hero Section:**
![Home Page](screenshots/home.png)

**Products Grid:**
![Products](screenshots/products.png)

**Cart Page:**
![Cart](screenshots/cart.png)

**Checkout Receipt Modal:**
![Receipt](screenshots/receipt.png)

*(Replace the above screenshots with actual images from your app.)*

---

## ⚡ Notes / Future Improvements

* Integrate **Fake Store API** for dynamic products (optional)
* Multi-user support with login (currently mock user)
* Toast notifications for better UX
* Persist cart in browser localStorage for offline support

---

## 🛠 Tech Stack

* **Frontend:** React, React Router, CSS
* **Backend:** Node.js, Express
* **Database:** SQLite
* **API:** REST endpoints for products, cart, checkout

---

## 🎥 Demo Video

[Watch Demo Video](insert-video-link)

---

## 💻 License

MIT License. Free to use for learning and demonstration purposes.


