// utils/eligibilityValidator.ts

import { FormState } from "../types";

interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}


export const validateEligibilityInputs = (formData: FormState): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate Age for Salaried
    const ageForSalaried = Number(formData.aboutMe?.age);
    if (!ageForSalaried || ageForSalaried <= 0) {
        errors.push(`Age is required (current: ${ageForSalaried})`);
    } else if (ageForSalaried < 21 || ageForSalaried > 65) {
        errors.push(`Age must be between 21 and 65 years (current: ${ageForSalaried})`);
    }

    // Validate Age for Self Employed
    const ageForSelfEmployed = Number(formData.aboutMe?.age);
    if (!ageForSelfEmployed || ageForSelfEmployed <= 0) {
        errors.push(`Age is required (current: ${ageForSelfEmployed})`);
    } else if (ageForSelfEmployed < 21 || ageForSelfEmployed > 70) {
        errors.push(`Age must be between 21 and 65 years (current: ${ageForSelfEmployed})`);
    }

    // Validate Income
    const totalIncomeforSalaried = Number(formData.income?.totalIncome);
    if (!totalIncomeforSalaried || totalIncomeforSalaried <= 0) {
        errors.push(`Total income is required (current: ${totalIncomeforSalaried})`);
    } else if (formData.aboutMe?.residencyStatus === 'UAE Resident' ? totalIncomeforSalaried < 12000 : totalIncomeforSalaried < 8000) {
        errors.push(`Minimum monthly income should be AED 8,000 (current: ${totalIncomeforSalaried})`);
    }

    const totalIncomeforSelfEmployed = Number(formData.income?.totalIncome);
    if (!totalIncomeforSelfEmployed || totalIncomeforSelfEmployed <= 0) {
        errors.push(`Total income is required (current: ${totalIncomeforSelfEmployed})`);
    } else if (formData.aboutMe?.residencyStatus === 'UAE Resident' ? totalIncomeforSelfEmployed < 12000 : totalIncomeforSelfEmployed < 8000) {
        errors.push(`Minimum monthly income should be AED 8,000 (current: ${totalIncomeforSelfEmployed})`);
    }

    const totalIncome = formData.employment.employmentType === 'Salaried' ? totalIncomeforSalaried : totalIncomeforSelfEmployed;
    // Log validation state
    console.log('Validation State:', {
        ageForSalaried,
        totalIncome,
        errors,
        warnings
    });

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
};