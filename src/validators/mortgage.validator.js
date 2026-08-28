const VALID_PAYMENT_SCHEDULES = ['monthly', 'bi-weekly', 'accelerated-bi-weekly'];
const VALID_AMORTIZATION_YEARS = [5, 10, 15, 20, 25, 30];

function calculateMinimumDownPayment(propertyPrice) {
  if (propertyPrice <= 500000) {
    return propertyPrice * 0.05;
  }
  if (propertyPrice < 1500000) {
    return 500000 * 0.05 + (propertyPrice - 500000) * 0.10;
  }
  return propertyPrice * 0.20;
}

function isValid30YearAmortization(amortizationYears, propertyPrice, downPayment) {
  if (amortizationYears === 30) {
    const downPaymentRatio = downPayment / propertyPrice;
    return downPaymentRatio >= 0.20;
  }
  return true;
}

function getValidationErrors(input) {
  const {
    propertyPrice,
    downPayment,
    annualInterestRate,
    amortizationYears,
    paymentSchedule,
  } = input;

  // Basic presence and type checks
  if (typeof propertyPrice !== 'number' || propertyPrice <= 0) {
    return "propertyPrice must be a number greater than 0.";
  }
  if (typeof downPayment !== 'number' || downPayment < 0) {
    return "downPayment must be a positive number.";
  }
  if (downPayment >= propertyPrice) {
    return "downPayment must be less than propertyPrice.";
  }
  if (typeof annualInterestRate !== 'number' || annualInterestRate <= 0 || annualInterestRate >= 100) {
    return "annualInterestRate must be a positive number between 0 and 100 (e.g., 5 for 5%).";
  }

  // Enums and Allowed Values
  if (!VALID_AMORTIZATION_YEARS.includes(amortizationYears)) {
    return `amortizationYears must be one of: ${VALID_AMORTIZATION_YEARS.join(', ')}`;
  }
  if (!VALID_PAYMENT_SCHEDULES.includes(paymentSchedule)) {
    return `paymentSchedule must be one of: ${VALID_PAYMENT_SCHEDULES.join(', ')}`;
  }

  // Minimum Down Payment Check
  const minDownPayment = calculateMinimumDownPayment(propertyPrice);
  if (downPayment < minDownPayment) {
    return `Down payment is below the minimum required amount of $${minDownPayment}.`;
  }

  // 30-year Amortization Exception Check
  if (!isValid30YearAmortization(amortizationYears, propertyPrice, downPayment)) {
    return "A 30-year amortization period requires a down payment of at least 20%.";
  }

  return null;
}

const validateMortgageInput = (req, res, next) => {
  const error = getValidationErrors(req.body);
  
  if (error) {
    return res.status(400).json({ error });
  }

  next();
};

module.exports = {
  calculateMinimumDownPayment,
  isValid30YearAmortization,
  getValidationErrors,
  validateMortgageInput,
};
