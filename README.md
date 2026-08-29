# Benji Pays Mortgage Calculator

A take-home assignment to build a robust mortgage calculator API and UI.

## How to Run Locally

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the application in development mode (with automatic restarts):
```bash
npm run dev
```

To start the application normally:
```bash
npm start
```

The server will start on port 3000 by default. You can access the UI and API locally at `http://localhost:3000`.

### Running Tests
To run the comprehensive Jest test suite:
```bash
npm test
```

### Code Formatting
To automatically format the codebase using Prettier:
```bash
npm run format
```


## Implementation Details & Assumptions

### CMHC Insurance Rules Considered
The API strictly follows the provided CMHC guidelines based on the available input parameters:
1. **Property Price and Down Payment:**
   - **Minimum Down Payment Check:** Validates that the down payment meets the minimum requirements (5% for the first $500k, 10% for the amount between $500k and $1.5M, and 20% for properties $1.5M or above).
   - **Premium Rate Calculation:** Determines the CMHC insurance premium rate (0%, 2.80%, 3.10%, or 4.00%) based on the down payment percentage.
   - **Total Principal:** Calculates the final mortgage principal by subtracting the down payment from the property price and adding the calculated CMHC insurance premium.
2. **Amortization Period:**
   - Enforces a maximum 25-year amortization period for insured mortgages (down payment < 20%).

### Omitted CMHC Surcharges & Exceptions (Due to Input Constraints)
Certain CMHC rules mentioned in standard guidelines are intentionally omitted because the API's input specification does not provide the data required to evaluate them:
- **Non-traditional Down Payments:** Surcharges for borrowed down payments are ignored (assumes traditional down payment).
- **Self-Employed without Verified Income:** Surcharges for unverified income are ignored (assumes standard verified income).
- **30-Year Amortization Exception:** The recent rule allowing a 30-year amortization for first-time home buyers or new builds with an insured mortgage (which would incur a +0.20% premium surcharge) is not implemented.

### 30-Year Amortization Eligibility
Because the API cannot determine if a user is a first-time home buyer or purchasing a newly-constructed home, an explicit assumption is placed in the validator: **a 30-year amortization is only allowed with a 20% or greater down payment.** All 30-year amortizations with less than 20% down payment will be rejected to prevent generating invalid insurance quotes.

## Test Coverage

The project is thoroughly tested using Jest, featuring both unit and integration tests covering valid inputs, CMHC insurance rules, constraints, edge cases, and error handling. 

**Test Coverage Report (100% across all metrics):**

```text
-------------------------|---------|----------|---------|---------|
File                     | % Stmts | % Branch | % Funcs | % Lines |
-------------------------|---------|----------|---------|---------|
All files                |     100 |      100 |     100 |     100 |
 src                     |     100 |      100 |     100 |     100 |
  app.js                 |     100 |      100 |     100 |     100 |
 src/controllers         |     100 |      100 |     100 |     100 |
  mortgage.controller.js |     100 |      100 |     100 |     100 |
 src/routes              |     100 |      100 |     100 |     100 |
  mortgage.routes.js     |     100 |      100 |     100 |     100 |
 src/services            |     100 |      100 |     100 |     100 |
  cmhc.service.js        |     100 |      100 |     100 |     100 |
  mortgage.service.js    |     100 |      100 |     100 |     100 |
 src/services/payment    |     100 |      100 |     100 |     100 |
  acceleratedBiWeekly.js |     100 |      100 |     100 |     100 |
  biWeekly.js            |     100 |      100 |     100 |     100 |
  monthly.js             |     100 |      100 |     100 |     100 |
  paymentStrategies.js   |     100 |      100 |     100 |     100 |
 src/validators          |     100 |      100 |     100 |     100 |
  mortgage.validator.js  |     100 |      100 |     100 |     100 |
-------------------------|---------|----------|---------|---------|
```
