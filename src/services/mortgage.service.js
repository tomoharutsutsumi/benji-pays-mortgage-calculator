const cmhcService = require("./cmhc.service");
const paymentStrategies = require("./payment/paymentStrategies");

function calculateMortgage(input) {
  const baseMortgage = input.propertyPrice - input.downPayment;

  const cmhcInsurance = cmhcService.calculatePremium(
    input.propertyPrice,
    input.downPayment,
  );

  const principal = baseMortgage + cmhcInsurance;

  const strategy = paymentStrategies[input.paymentSchedule];

  const mortgagePayment = strategy.calculate(
    principal,
    input.annualInterestRate,
    input.amortizationYears,
  );

  return { mortgagePayment };
}

module.exports = {
  calculateMortgage,
};
