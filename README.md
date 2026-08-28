# Benji Pays Mortgage Calculator

A take-home assignment to build a simple mortgage calculator API.

## Assumptions

### 30-Year Amortization Eligibility
For this assignment, a 30-year amortization is only allowed with a **20% or greater down payment**. The provided input specifications do not include the eligibility information (such as first-time home buyer or new construction status) required to evaluate an insured 30-year mortgage under the latest Canadian rules. Thus, an explicit assumption is placed in the validator enforcing the 20% down payment minimum for all 30-year amortizations.
