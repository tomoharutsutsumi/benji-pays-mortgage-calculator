const express = require("express");
const { calculateMortgageHandler } = require("../controllers/mortgage.controller");

const router = express.Router();

router.post("/calculate", calculateMortgageHandler);

module.exports = router;
