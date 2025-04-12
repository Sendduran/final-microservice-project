const express = require("express");
const router = express.Router();
const pool = require("../db");
const axios = require("axios");

// Add a room
router.post("/", async (req, res) => {
  const { room_number, capacity } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO rooms (room_number, capacity) VALUES ($1, $2) RETURNING *",
      [room_number, capacity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Allocate a student to a room (with validation)
router.post("/allocate", async (req, res) => {
  const { student_id, room_id } = req.body;

  try {
    // Call student-service to validate student
    await axios.get(`http://student-service:3000/students/${student_id}`);
  } catch (err) {
    return res
      .status(404)
      .json({ error: "Student not found in student-service" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO allocations (student_id, room_id) VALUES ($1, $2) RETURNING *",
      [student_id, room_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View allocations
router.get("/allocations/:student_id", async (req, res) => {
  const { student_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM allocations WHERE student_id = $1",
      [student_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
