function calculate(principal, annualInterestRate, amortizationYears) {
  const r = annualInterestRate / 100 / 26;
  const n = amortizationYears * 26;

  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

module.exports = { calculate };
