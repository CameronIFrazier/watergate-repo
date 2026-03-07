require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");


//fixing cors issues push
const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://watergate-repo-7ofd.vercel.app"]
}));
app.options("*", cors({
  origin: ["http://localhost:5173", "https://watergate-repo-7ofd.vercel.app"]
}));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ MySQL Connected");
});

// API route to create account
app.post("/create-account", (req, res) => {
    const { firstName, lastName, username, accountType } = req.body;

    const query = `
        INSERT INTO accounts (first_name, last_name, username, account_type)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [firstName, lastName, username, accountType], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Account created successfully", accountId: result.insertId });
    });
});

app.get("/api/check-user/:username", (req, res) => {
  const { username } = req.params;

  db.query("SELECT * FROM accounts WHERE username = ?", [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      res.json({ exists: true, user: results[0] });
    } else {
      res.json({ exists: false });
    }
  });
});

app.get("/api/balance/:username", (req, res) => {
  const { username } = req.params;

  db.query(
    "SELECT checking_balance, savings_balance FROM accounts WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length > 0) {
        res.json({
          checking_balance: results[0].checking_balance,
          savings_balance: results[0].savings_balance,
        });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  );
});

app.post("/api/update_balances", (req, res) => {
  const { username, checking_balance, savings_balance } = req.body;

  const query = `
    UPDATE accounts 
    SET checking_balance = ?, savings_balance = ?
    WHERE username = ?
  `;

  db.query(query, [checking_balance, savings_balance, username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database update failed" });
    }
    res.json({ 
      message: "Balances updated successfully",
      checking_balance,
      savings_balance
    });
  });
});

app.listen(8080, () => console.log("🚀 Server running on port 8080"));

