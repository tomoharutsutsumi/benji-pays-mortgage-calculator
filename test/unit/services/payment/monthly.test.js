const monthly = require('../../../../src/services/payment/monthly');

describe('Monthly Payment Strategy', () => {
  it('should calculate the correct monthly payment', () => {
    const principal = 300000;
    const annualInterestRate = 5;
    const amortizationYears = 25;

    const payment = monthly.calculate(principal, annualInterestRate, amortizationYears);
    
    expect(payment).toBeCloseTo(1753.77, 1); 
  });
});
