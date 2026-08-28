const biWeekly = require('../../../../src/services/payment/biWeekly');

describe('Bi-Weekly Payment Strategy', () => {
  it('should calculate the correct bi-weekly payment', () => {
    const principal = 300000;
    const annualInterestRate = 5;
    const amortizationYears = 25;

    const payment = biWeekly.calculate(principal, annualInterestRate, amortizationYears);
    
    expect(payment).toBeCloseTo(809.00, 1); 
  });
});
