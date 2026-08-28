const {
  calculateMinimumDownPayment,
  isValid30YearAmortization,
  getValidationErrors,
} = require('../../../src/validators/mortgage.validator');

describe('Mortgage Validator', () => {
  describe('calculateMinimumDownPayment', () => {
    it('should require 5% for properties <= $500,000', () => {
      expect(calculateMinimumDownPayment(500000)).toBe(25000); // 500k * 0.05
      expect(calculateMinimumDownPayment(300000)).toBe(15000); // 300k * 0.05
    });

    it('should require 5% for the first $500k and 10% for the rest if < $1.5M', () => {
      expect(calculateMinimumDownPayment(600000)).toBe(35000); // 25k + 10k
      expect(calculateMinimumDownPayment(999999)).toBeCloseTo(25000 + 49999.9, 2);
    });

    it('should require 20% for properties >= $1.5M', () => {
      expect(calculateMinimumDownPayment(1500000)).toBe(300000); // 1.5M * 0.20
      expect(calculateMinimumDownPayment(2000000)).toBe(400000); // 2M * 0.20
    });
  });

  describe('isValid30YearAmortization', () => {
    it('should return true if amortization is not 30 years', () => {
      expect(isValid30YearAmortization(25, 500000, 25000)).toBe(true);
    });

    it('should return true if amortization is 30 years and down payment is >= 20%', () => {
      expect(isValid30YearAmortization(30, 500000, 100000)).toBe(true);
    });

    it('should return false if amortization is 30 years and down payment is < 20%', () => {
      expect(isValid30YearAmortization(30, 500000, 50000)).toBe(false);
    });
  });

  describe('getValidationErrors', () => {
    const validBaseInput = {
      propertyPrice: 500000,
      downPayment: 100000,
      annualInterestRate: 5.5,
      amortizationYears: 25,
      paymentSchedule: 'monthly',
    };

    it('should return null for valid inputs', () => {
      expect(getValidationErrors(validBaseInput)).toBeNull();
    });

    it('should return error for invalid propertyPrice', () => {
      expect(getValidationErrors({ ...validBaseInput, propertyPrice: -100 })).toBe("propertyPrice must be a number greater than 0.");
      expect(getValidationErrors({ ...validBaseInput, propertyPrice: "500000" })).toBe("propertyPrice must be a number greater than 0.");
    });

    it('should return error for negative downPayment', () => {
      expect(getValidationErrors({ ...validBaseInput, downPayment: -10 })).toBe("downPayment must be a positive number.");
    });

    it('should return error if downPayment >= propertyPrice', () => {
      expect(getValidationErrors({ ...validBaseInput, downPayment: 600000 })).toBe("downPayment must be less than propertyPrice.");
    });

    it('should return error for invalid annualInterestRate (non-positive or >= 100)', () => {
      const errMsg = "annualInterestRate must be a positive number between 0 and 100 (e.g., 5 for 5%).";
      expect(getValidationErrors({ ...validBaseInput, annualInterestRate: 0 })).toBe(errMsg);
      expect(getValidationErrors({ ...validBaseInput, annualInterestRate: -5 })).toBe(errMsg);
      expect(getValidationErrors({ ...validBaseInput, annualInterestRate: 150 })).toBe(errMsg);
    });

    it('should return error for invalid amortizationYears', () => {
      expect(getValidationErrors({ ...validBaseInput, amortizationYears: 27 })).toContain("amortizationYears must be one of");
    });

    it('should return error for invalid paymentSchedule', () => {
      expect(getValidationErrors({ ...validBaseInput, paymentSchedule: 'yearly' })).toContain("paymentSchedule must be one of");
    });

    it('should return error if down payment is below minimum required', () => {
      // For 600k, min down payment is 35k
      expect(getValidationErrors({ ...validBaseInput, propertyPrice: 600000, downPayment: 30000 })).toBe("Down payment is below the minimum required amount.");
    });

    it('should return error if 30-year amortization has < 20% down payment', () => {
      // 500k property, 20% is 100k. Providing 50k should fail for 30 years.
      expect(getValidationErrors({ ...validBaseInput, amortizationYears: 30, downPayment: 50000 })).toBe("A 30-year amortization period requires a down payment of at least 20%.");
    });
  });
});
