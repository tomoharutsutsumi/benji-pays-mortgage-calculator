const express = require("express");
const { calculateMortgage } = require("../controllers/mortgage.controller");

const router = express.Router();

router.post("/calculate", calculateMortgage);

module.exports = router;
