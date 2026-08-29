const { calculateMortgage } = require("../services/mortgage.service");

const calculateMortgageHandler = (req, res) => {
  const result = calculateMortgage(req.body);

  res.status(200).json(result);
};

module.exports = {
  calculateMortgageHandler,
};
