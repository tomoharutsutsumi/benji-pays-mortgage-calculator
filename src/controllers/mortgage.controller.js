const calculateMortgage = (req, res) => {
    const {
        propertyPrice,
        downPayment,
        annualInterestRate,
        amortizationYears,
        paymentSchedule,
    } = req.body;

    console.log({
        propertyPrice,
        downPayment,
        annualInterestRate,
        amortizationYears,
        paymentSchedule,
    });

    res.status(200).json({
        message: "Received",
    });
};

module.exports = {
    calculateMortgage,
};