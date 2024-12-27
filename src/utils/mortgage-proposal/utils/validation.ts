// utils/validation.ts

import { z } from 'zod';
import type { FormState } from '../types';

export const aboutMeSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  age: z.number().min(21, 'Must be at least 21 years old').max(70, 'Must be under 70 years old'),
  residencyStatus: z.enum(['UAE Resident', 'Non-resident', 'UAE National']),
  applicationType: z.enum(['Single', 'Joint']),
  nationality: z.string().min(2, 'Nationality is required')
});

export const financialRequirementSchema = z.object({
  purpose: z.enum(['New Purchase', 'Refinance']),
  mortgageType: z.enum(['Islamic', 'Conventional']),
  salaryTransfer: z.boolean(),
  feeFinancing: z.boolean(),
  ratePreference: z.enum(['Variable', 'Fixed'])
});

export const employmentSchema = z.object({
  status: z.enum(['Employed', 'Self-Employed']),
  employerName: z.string().min(2, 'Employer name is required'),
  duration: z.enum(['Newly Joined', 'Less than 6 months', 'More than 6 months', 'More than 2 years', 'More than 5 years']),
});

export const incomeSchema = z.object({
  monthlySalary: z.number().min(0, 'Monthly salary is required'),
  otherIncome: z.object({
    rental: z.number().min(0, 'Rental income is required'),
    bonus: z.number().min(0, 'Bonus income is required'),
    commission: z.number().min(0, 'Commission income is required')
  })
});

export const liabilitySchema = z.object({
  homeValue: z.number().min(0, 'Home value is required'),
  downPayment: z.number().min(0, 'Down payment is required'),
  loanAmount: z.number().min(0, 'Loan amount is required'),
  loanTerm: z.number().min(0, 'Loan term is required'),
});

export const propertyDetailsSchema = z.object({
  propertyType: z.enum(['Under Construction', 'Completed']),
  propertyStage: z.enum(['Still Searching', 'Viewing Properties', 'Made an Offer']),
  propertyUsage: z.enum(['Residential', 'Commercial', 'Investment']),
});
export const validateStep = (step: number, data: Partial<FormState>): string[] => {
  const errors: string[] = [];

  try {
    switch (step) {
      case 1:
        aboutMeSchema.parse(data.aboutMe);
        financialRequirementSchema.parse(data.financialRequirement);
        break;
      case 2:
        employmentSchema.parse(data.employment);
        break;
      case 3:
        incomeSchema.parse(data.income);
        break;
      case 4:
        liabilitySchema.parse(data.liability);
        break;
      case 5:
        propertyDetailsSchema.parse(data.propertyDetails);
        break;
    }
  } catch (error:any) {
    if (error instanceof z.ZodError) {
      errors.push(...error.errors.map(e => e.message));
    }
  }

  return errors;
};

export const validateIncome = (income: number, residencyStatus: string): boolean => {
  const minimumIncome = residencyStatus === 'UAE National' ? 8000 :
                       residencyStatus === 'UAE Resident' ? 10000 : 25000;
  return income >= minimumIncome;
};