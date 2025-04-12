require("dotenv").config();
const client = require("prom-client");
const express = require("express");
const studentRoutes = require("./routes/student.routes");
const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.use(express.json());
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Student Service running on port ${PORT}`));
