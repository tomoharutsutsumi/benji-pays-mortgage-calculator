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


## Assumptions

### 30-Year Amortization Eligibility
For this assignment, a 30-year amortization is only allowed with a **20% or greater down payment**. The provided input specifications do not include the eligibility information (such as first-time home buyer or new construction status) required to evaluate an insured 30-year mortgage under the latest Canadian rules. Thus, an explicit assumption is placed in the validator enforcing the 20% down payment minimum for all 30-year amortizations.

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
