const request = require('supertest');
const app = require('../../src/app');

describe('Mortgage Calculator Integration Tests', () => {
  describe('POST /mortgages/calculate', () => {
    
    it('should return 200 and the correct monthly payment for a valid request', async () => {
      const payload = {
        propertyPrice: 300000,
        downPayment: 100000, // 33.3% down (no CMHC insurance)
        annualInterestRate: 5, // 5%
        amortizationYears: 25,
        paymentSchedule: 'monthly'
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      // Expected calculation:
      // Base mortgage: 200,000
      // CMHC Premium: 0 (since down payment > 20%)
      // Principal: 200,000
      // Monthly payment over 25 years at 5%: ~1169.18
      expect(response.body).toHaveProperty('mortgagePayment');
      expect(response.body.mortgagePayment).toBeCloseTo(1169.18, 1);
    });

    it('should return 200 and include CMHC premium in the payment for < 20% down', async () => {
      const payload = {
        propertyPrice: 300000,
        downPayment: 30000, // 10% down -> requires 3.1% CMHC premium
        annualInterestRate: 5,
        amortizationYears: 25,
        paymentSchedule: 'monthly'
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      // Expected calculation:
      // Base mortgage: 270,000
      // CMHC Premium: 270,000 * 0.031 = 8,370
      // Principal: 278,370
      // Monthly payment over 25 years at 5% (Principal 278,370): ~1627.32
      expect(response.body).toHaveProperty('mortgagePayment');
      expect(response.body.mortgagePayment).toBeCloseTo(1627.32, 1);
    });

    it('should return 400 Bad Request when down payment is below the legal minimum', async () => {
      const payload = {
        propertyPrice: 300000,
        downPayment: 10000, // Less than 5% (which would be 15,000)
        annualInterestRate: 5,
        amortizationYears: 25,
        paymentSchedule: 'monthly'
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Down payment is below the minimum required amount of $15000.');
    });

    it('should return 400 Bad Request for an invalid amortization period', async () => {
      const payload = {
        propertyPrice: 300000,
        downPayment: 100000,
        annualInterestRate: 5,
        amortizationYears: 27, // Invalid
        paymentSchedule: 'monthly'
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('amortizationYears must be one of');
    });

    it('should return 400 Bad Request when attempting 30 year amortization with < 20% down', async () => {
      const payload = {
        propertyPrice: 500000,
        downPayment: 50000, // 10% down
        annualInterestRate: 5,
        amortizationYears: 30, // 30 years requires 20% down
        paymentSchedule: 'monthly'
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('A 30-year amortization period requires a down payment of at least 20%.');
    });
    it('should return 200 and correct payment for accelerated-bi-weekly schedule', async () => {
      const payload = {
        propertyPrice: 300000,
        downPayment: 100000,
        annualInterestRate: 5,
        amortizationYears: 25,
        paymentSchedule: 'accelerated-bi-weekly'
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      // Monthly was ~1169.18, so accelerated should be exactly half: ~584.59
      expect(response.body).toHaveProperty('mortgagePayment');
      expect(response.body.mortgagePayment).toBeCloseTo(584.59, 1);
    });

    it('should return 400 Bad Request when propertyPrice is not a number', async () => {
      const payload = {
        propertyPrice: "300000", // Invalid type
        downPayment: 100000,
        annualInterestRate: 5,
        amortizationYears: 25,
        paymentSchedule: 'monthly'
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.error).toBe('propertyPrice must be a number greater than 0.');
    });

    it('should return 400 Bad Request for a $1.5M+ property with < 20% down payment', async () => {
      const payload = {
        propertyPrice: 2000000, // $2M
        downPayment: 300000, // 15%, below 20% minimum for properties >= $1.5M
        annualInterestRate: 5,
        amortizationYears: 25,
        paymentSchedule: 'monthly'
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.error).toBe('Down payment is below the minimum required amount of $400000.');
    });
    it('should return 200 and correct payment for bi-weekly schedule', async () => {
      const payload = {
        propertyPrice: 400000,
        downPayment: 100000,
        annualInterestRate: 5,
        amortizationYears: 25,
        paymentSchedule: 'bi-weekly'
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      // Same as unit test for bi-weekly: ~809.00
      expect(response.body).toHaveProperty('mortgagePayment');
      expect(response.body.mortgagePayment).toBeCloseTo(809.00, 1);
    });

    it('should return 400 Bad Request when paymentSchedule is invalid', async () => {
      const payload = {
        propertyPrice: 300000,
        downPayment: 100000,
        annualInterestRate: 5,
        amortizationYears: 25,
        paymentSchedule: 'weekly' // Invalid schedule
      };

      const response = await request(app)
        .post('/mortgages/calculate')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.error).toContain('paymentSchedule must be one of');
    });

  });
});
