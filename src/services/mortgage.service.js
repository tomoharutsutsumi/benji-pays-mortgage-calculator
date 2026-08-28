const calculateMortgage = ({
    propertyPrice,
    downPayment,
    annualInterestRate,
    amortizationYears,
    paymentSchedule,
}) => {
    // Mortgage calculation logic will go here.

    const baseMortgage = propertyPrice - downPayment
    const downPaymentRatio = (downPayment / propertyPrice) * 100
    const cmhcInsurance = baseMortgage * premiumRate(downPaymentRatio)
    const principal = baseMortgage + cmhcInsurance
    const periodicInterestRate = annualInterestRate / paymentsPerYear(paymentSchedule)
    const numberOfPayments = amortizationYears * paymentsPerYear(paymentSchedule)
    const mortgagePayment = 
        principal * 
        (
            (periodicInterestRate * Math.pow(1 + periodicInterestRate, numberOfPayments)) / 
            (Math.pow(1 + periodicInterestRate, numberOfPayments) - 1)
        );

    return {
        mortgagePayment
    };
};

module.exports = {
    calculateMortgage,
};
