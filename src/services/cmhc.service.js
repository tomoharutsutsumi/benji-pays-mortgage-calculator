function calculatePremium(propertyPrice, downPayment) {
  const baseMortgage = propertyPrice - downPayment;
  const downPaymentRatio = (downPayment / propertyPrice) * 100;

  const premiumRate = getPremiumRate(downPaymentRatio);

  return baseMortgage * premiumRate;
}

function getPremiumRate(downPaymentRatio) {
  const PREMIUM_RATES = [
    { minPercent: 20, rate: 0 },
    { minPercent: 15, rate: 0.028 },
    { minPercent: 10, rate: 0.031 },
    { minPercent: 5, rate: 0.04 },
  ];

  const tier = PREMIUM_RATES.find(
    ({ minPercent }) => downPaymentRatio >= minPercent
  );

  return tier.rate;
}

module.exports = {
  calculatePremium,
};
