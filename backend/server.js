// backend/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { init } = require('./db');

const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const checkoutRoute = require('./routes/checkout');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

init();

app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);
app.use('/api/checkout', checkoutRoute);

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
