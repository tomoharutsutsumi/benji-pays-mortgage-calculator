const monthly = require("./monthly");
const biWeekly = require("./biWeekly");
const acceleratedBiWeekly = require("./acceleratedBiWeekly");

const paymentStrategies = {
  monthly,
  "bi-weekly": biWeekly,
  "accelerated-bi-weekly": acceleratedBiWeekly,
};

module.exports = paymentStrategies;
