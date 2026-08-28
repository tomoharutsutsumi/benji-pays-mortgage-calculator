const monthly = require("./monthly");

function calculate(principal, annualInterestRate, amortizationYears) {
  return monthly.calculate(
    principal,
    annualInterestRate,
    amortizationYears
  ) / 2;
}

module.exports = { calculate };
