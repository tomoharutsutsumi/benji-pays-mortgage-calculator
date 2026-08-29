function calculate(principal, annualInterestRate, amortizationYears) {
  const r = annualInterestRate / 100 / 12;
  const n = amortizationYears * 12;

  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

module.exports = { calculate };
