const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 SERVE FRONTEND FILES
app.use(express.static(path.join(__dirname, "fronted")));

// 🔹 MYSQL CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mallesh@2006",
  database: "quizverse",
  port: 3306,
});

// 🔹 CONNECT DATABASE
db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err.message);
  } else {
    console.log("MySQL Connected");
  }
});

// 🔹 API ROUTE
app.get("/quizzes", (req, res) => {
  db.query("SELECT * FROM quizzes", (err, results) => {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.json(results);
    }
  });
});

// 🔹 DEFAULT ROUTE → FRONTEND
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "fronted", "index.html"));
});

// 🔹 START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
