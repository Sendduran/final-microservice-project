require("dotenv").config();
const client = require("prom-client");
const express = require("express");
const studentRoutes = require("./routes/student.routes");

const app = express();

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.use(express.json());
app.use("/students", studentRoutes);

module.exports = app;
