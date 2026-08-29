const acceleratedBiWeekly = require("../../../../src/services/payment/acceleratedBiWeekly");
const monthly = require("../../../../src/services/payment/monthly");

jest.mock("../../../../src/services/payment/monthly", () => ({
  calculate: jest.fn(),
}));

describe("Accelerated Bi-Weekly Payment Strategy", () => {
  it("should return exactly half of the monthly payment", () => {
    const principal = 300000;
    const annualInterestRate = 5;
    const amortizationYears = 25;

    const fakeMonthlyPayment = 1000;
    monthly.calculate.mockReturnValue(fakeMonthlyPayment);

    const payment = acceleratedBiWeekly.calculate(
      principal,
      annualInterestRate,
      amortizationYears,
    );

    expect(monthly.calculate).toHaveBeenCalledWith(
      principal,
      annualInterestRate,
      amortizationYears,
    );
    expect(payment).toBe(fakeMonthlyPayment / 2);
  });
});
