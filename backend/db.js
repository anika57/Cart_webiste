// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'data', 'ecom.db');
const DB_DIR = path.dirname(DB_FILE);
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const db = new sqlite3.Database(DB_FILE);

const init = () => {
  db.serialize(() => {
    // products
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      price REAL,
      image TEXT
    )`);

    // cart
    db.run(`CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId TEXT,
      qty INTEGER,
      addedAt TEXT,
      FOREIGN KEY(productId) REFERENCES products(id)
    )`);

    // receipts
    db.run(`CREATE TABLE IF NOT EXISTS receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total REAL,
      payload TEXT,
      name TEXT,
      email TEXT,
      createdAt TEXT
    )`);

    // seed products if empty
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
      if (err) return console.error(err);
      if (row.count === 0) {
        const stmt = db.prepare("INSERT INTO products (id, name, description, price, image) VALUES (?, ?, ?, ?, ?)");
        const items = [
          ['p1','Vintage Jeans','Classic blue washed jeans',799.99,'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?_gl=1*10k2dvj*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzU3MjkkajQ0JGwwJGgw'],
          ['p2','Pink Hoodie','Pink crop hoodie with a logo on it',499.50,'https://images.pexels.com/photos/1475418/pexels-photo-1475418.jpeg?_gl=1*uyn03m*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzU4MDAkajU0JGwwJGgw'],
          ['p3','Stripped Dress','Mid length Dress',999.90,'https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg?_gl=1*pmwsvq*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzU4MzUkajE5JGwwJGgw'],
          ['p4','Yellow Top','Yellow sleeveless crop top',599.99,'https://images.pexels.com/photos/3236651/pexels-photo-3236651.jpeg?_gl=1*1t2w77f*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzU4MzUkajE5JGwwJGgw'],
          ['p5','White Washed Jeans','White washed blue jeanse',1299.99,'https://images.pexels.com/photos/4210864/pexels-photo-4210864.jpeg?_gl=1*xchu7b*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzYwMjMkajU5JGwwJGgw'],
          ['p6','Top','Top with a cover up',399.99,'https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg?_gl=1*1s0xabw*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzYwNjUkajE3JGwwJGgw'],
          ['p7','Pink Sweater','Pink Fluffy Sweater',799.99,'https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?_gl=1*nr3l3g*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzY0NjgkajYwJGwwJGgw'],
          ['p8','Graphic T-Shirt','White Graphic T-Shirt',499.50,'https://images.pexels.com/photos/2112651/pexels-photo-2112651.jpeg?_gl=1*78wfmi*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzY3MTEkajU2JGwwJGgw'],
          ['p9','Tropical Dress','Tropical Dress',999.90,'https://images.pexels.com/photos/2498791/pexels-photo-2498791.jpeg?_gl=1*17gkix9*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzczMDAkajYwJGwwJGgw'],
          ['p10','Pink Puffer Jacket','Pink Puffer Jacket',599.99,'https://images.pexels.com/photos/2269343/pexels-photo-2269343.jpeg?_gl=1*1p0k55m*_ga*MTY3MjQ0MzYxMS4xNzUyMzE4ODU3*_ga_8JE65Q40S6*czE3NjI0MzUxMTUkbzgkZzEkdDE3NjI0MzczODMkajU5JGwwJGgw'],
        ];
        items.forEach(i => stmt.run(i));
        stmt.finalize();
        console.log('Seeded products');
      }
    });
  });
};

module.exports = { db, init };
