const express = require("express");
const {
  calculateMortgageHandler,
} = require("../controllers/mortgage.controller");
const { validateMortgageInput } = require("../validators/mortgage.validator");

const router = express.Router();

router.post("/calculate", validateMortgageInput, calculateMortgageHandler);

module.exports = router;
