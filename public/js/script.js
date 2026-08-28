document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mortgage-form');
    const resultContainer = document.getElementById('result-container');
    const paymentResult = document.getElementById('payment-result');
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Hide previous results/errors
        resultContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');

        // Gather form data
        const payload = {
            propertyPrice: parseFloat(document.getElementById('propertyPrice').value),
            downPayment: parseFloat(document.getElementById('downPayment').value),
            annualInterestRate: parseFloat(document.getElementById('annualInterestRate').value),
            amortizationYears: parseInt(document.getElementById('amortizationYears').value, 10),
            paymentSchedule: document.getElementById('paymentSchedule').value
        };

        try {
            const response = await fetch('/mortgages/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                // Success: Format as currency
                const formatter = new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: 'CAD'
                });
                paymentResult.textContent = formatter.format(data.mortgagePayment);
                resultContainer.classList.remove('hidden');
            } else {
                // Validation Error
                errorMessage.textContent = data.error || 'An unknown validation error occurred.';
                errorContainer.classList.remove('hidden');
            }
        } catch (error) {
            // Network or Unexpected Error
            errorMessage.textContent = 'Failed to connect to the server. Please try again later.';
            errorContainer.classList.remove('hidden');
            console.error('Fetch error:', error);
        }
    });
});
