const express = require("express");
const mortgageRoutes = require("./routes/mortgage.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/mortgages", mortgageRoutes);

module.exports = app;