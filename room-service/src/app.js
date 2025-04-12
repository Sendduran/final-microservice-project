require("dotenv").config();
const client = require("prom-client");
const express = require("express");
const roomRoutes = require("./routes/room.routes");

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.use(express.json());
app.use("/rooms", roomRoutes);

module.exports = app;
