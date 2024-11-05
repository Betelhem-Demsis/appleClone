const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const app = express();

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

pool.query("SELECT 1 + 1 AS solution", (err, results) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log(
      "Connected to the database, test query result:",
      results[0].solution
    );
  }
});

app.get("/install", (req, res) => {
  const createTables = [
    `CREATE TABLE IF NOT EXISTS Products (
            product_id INT AUTO_INCREMENT,
            product_url VARCHAR(255) NOT NULL,
            product_name VARCHAR(255) NOT NULL,
            PRIMARY KEY (product_id)
        )`,
    `CREATE TABLE IF NOT EXISTS ProductDescription (
            description_id INT AUTO_INCREMENT,
            product_id INT NOT NULL,
            brief_description VARCHAR(255) NOT NULL,
            product_description VARCHAR(255) NOT NULL,
            product_img VARCHAR(255) NOT NULL,
            product_link VARCHAR(255) NOT NULL,
            PRIMARY KEY (description_id),
            FOREIGN KEY (product_id) REFERENCES Products(product_id)
        )`,
    `CREATE TABLE IF NOT EXISTS ProductPrice (
            price_id INT AUTO_INCREMENT,
            product_id INT NOT NULL,
            starting_price VARCHAR(255) NOT NULL,
            price_range VARCHAR(255) NOT NULL,
            PRIMARY KEY (price_id),
            FOREIGN KEY (product_id) REFERENCES Products(product_id)
        )`,
    `CREATE TABLE IF NOT EXISTS Users (
            user_id INT AUTO_INCREMENT,
            user_name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            PRIMARY KEY (user_id)
        )`,
    `CREATE TABLE IF NOT EXISTS Orders (
            order_id INT AUTO_INCREMENT,
            product_id INT NOT NULL,
            user_id INT NOT NULL,
            PRIMARY KEY (order_id),
            FOREIGN KEY (product_id) REFERENCES Products(product_id),
            FOREIGN KEY (user_id) REFERENCES Users(user_id)
        )`,
  ];

  createTables.forEach((query, index) => {
    pool.query(query, (err, result) => {
      if (err) console.log(`Error creating table ${index + 1}:`, err);
      else console.log(`Table ${index + 1} created successfully`);
    });
  });
  res.send("All tables created successfully");
});

app.get("/iphones", (req, res) => {
  const query = `
        SELECT Products.product_id, product_url, product_name, 
               brief_description AS product_brief_description,
               product_img, starting_price, price_range 
        FROM Products 
        JOIN ProductDescription ON Products.product_id = ProductDescription.product_id 
        JOIN ProductPrice ON Products.product_id = ProductPrice.product_id
    `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: "Failed to fetch products" });
    } else {
      res.json({ products: results });
    }
  });
});

app.post("/add-product", (req, res) => {
  const { product_url, product_name } = req.body;

  const insertProduct = `INSERT INTO Products (product_url, product_name) VALUES (?, ?)`;

  pool.query(insertProduct, [product_url, product_name], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error inserting data into database");
    }
    console.log("Product added successfully");
    res.send("Product added successfully");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
