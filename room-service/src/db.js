const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Retry logic to wait for the DB to be ready before creating tables
const initDB = async (retries = 10, delay = 5000) => {
  const createRoomsTable = `
    CREATE TABLE IF NOT EXISTS rooms (
      id SERIAL PRIMARY KEY,
      room_number VARCHAR(50),
      capacity INT
    );
  `;

  const createAllocationsTable = `
    CREATE TABLE IF NOT EXISTS allocations (
      id SERIAL PRIMARY KEY,
      student_id INT,
      room_id INT
    );
  `;

  for (let i = 0; i < retries; i++) {
    try {
      await pool.query(createRoomsTable);
      await pool.query(createAllocationsTable);
      console.log("✅ Room and allocation tables are ready.");
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
