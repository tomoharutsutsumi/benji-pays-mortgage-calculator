const express = require("express");
const path = require("path");
const mortgageRoutes = require("./routes/mortgage.routes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use("/mortgages", mortgageRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;