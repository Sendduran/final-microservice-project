const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Retry connection logic
const initDB = async (retries = 10, delay = 5000) => {
  const createStudentsTable = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      course VARCHAR(100)
    );
  `;

  for (let i = 0; i < retries; i++) {
    try {
      await pool.query(createStudentsTable);
      console.log("✅ Student table is ready.");
      return;
    } catch (err) {
      console.error(`❌ Attempt ${i + 1} failed: ${err.message}`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  console.error("❌ Could not connect to database after multiple attempts.");
};

initDB();

module.exports = pool;
