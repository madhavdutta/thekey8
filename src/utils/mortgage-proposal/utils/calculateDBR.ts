// utils/calculateDBR.ts

import type { Income, Liability } from '../types';

export const calculateDBR = (income: Income, liability: Liability): number => {
  const totalMonthlyIncome = income.monthlySalary +
    (income.otherIncome.rental || 0) +
    (income.otherIncome.bonus ? income.otherIncome.bonus / 12 : 0) +
    (income.otherIncome.commission || 0);

  const totalMonthlyLiabilities =
    liability.personalLoanEMI +
    liability.autoLoanEMI +
    liability.existingMortgageEMI +
    (liability.creditCards.has ? liability.creditCards.totalLimit! * 0.05 : 0); // 5% of credit card limit

  return (totalMonthlyLiabilities / totalMonthlyIncome) * 100;
};

export const calculateEligibility = (
  income: Income,
  liability: Liability,
  residence: string
): { maxLoanAmount: number; ltvRatio: number } => {
  const dbr = calculateDBR(income, liability);
  const maxDBR = 49; // UAE Central Bank regulation
  const availableDBR = maxDBR - dbr;

  // Calculate max EMI based on available DBR
  const maxMonthlyEMI = (income.totalIncome * (availableDBR / 100));

  // Calculate max loan amount based on stress test rate
  const stressRate = liability.stressRate / 100 / 12; // Monthly rate
  const tenure = 25 * 12; // 25 years in months

  const maxLoanAmount = maxMonthlyEMI * ((1 - Math.pow(1 + stressRate, -tenure)) / stressRate);

  // Apply LTV restrictions based on residency
  const ltvRatio = residence === 'UAE National' ? 0.85 :
    residence === 'UAE Resident' ? 0.80 : 0.65;

  // const maxLoanBasedOnLTV = propertyValue * ltvRatio;

  // const finalMaxLoan = Math.min(maxLoanAmount, maxLoanBasedOnLTV);
  // const requiredDownPayment = propertyValue - maxLoanAmount;

  return {
    maxLoanAmount: maxLoanAmount,
    ltvRatio: ltvRatio
  };
};

