const sql = require("mysql");

// Database configuration
const dbConfig = {
  host: process.env.SERVER_HOST,
  user: process.env.SERVER_USER,
  password: process.env.SERVER_PASS,
  database: process.env.SERVER_DB,
}

// Create a connection to the database
const conn = sql.createConnection(dbConfig);

// Connect to the database
conn.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

module.exports = { conn };
