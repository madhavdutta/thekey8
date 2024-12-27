import React, { useState, useEffect } from 'react';
import { FormState } from '../../../types/mortgage-proposal/forms';

interface LiabilitiesProps {
    onNext: (data: Partial<FormState>) => void;
    onBack: () => void;
    formState: FormState;
}

const Liabilities: React.FC<LiabilitiesProps> = ({ onNext, onBack, formState }) => {
    const [formData, setFormData] = useState({
        hasCreditCards: formState.liability?.creditCards?.has || false,
        creditCardLimit: formState.liability?.creditCards?.totalLimit || '',
        personalLoanEMI: formState.liability?.personalLoanEMI || '',
        autoLoanEMI: formState.liability?.autoLoanEMI || '',
        existingMortgageEMI: formState.liability?.existingMortgageEMI || '',
        totalLiability: 0
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        // Calculate total monthly liabilities
        const total = 
            (formData.hasCreditCards ? Number(formData.creditCardLimit) * 0.05 : 0) + // 5% of credit card limit
            Number(formData.personalLoanEMI || 0) +
            Number(formData.autoLoanEMI || 0) +
            Number(formData.existingMortgageEMI || 0);

        setFormData(prev => ({
            ...prev,
            totalLiability: total
        }));
    }, [formData.hasCreditCards, formData.creditCardLimit, formData.personalLoanEMI, formData.autoLoanEMI, formData.existingMortgageEMI]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (formData.hasCreditCards && !formData.creditCardLimit) {
            newErrors.creditCardLimit = 'Credit card limit is required';
        }
        if (Number(formData.personalLoanEMI) < 0) newErrors.personalLoanEMI = 'EMI cannot be negative';
        if (Number(formData.autoLoanEMI) < 0) newErrors.autoLoanEMI = 'EMI cannot be negative';
        if (Number(formData.existingMortgageEMI) < 0) newErrors.existingMortgageEMI = 'EMI cannot be negative';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onNext({
                liability: {
                    creditCards: {
                        has: formData.hasCreditCards,
                        totalLimit: Number(formData.creditCardLimit) || 0
                    },
                    personalLoanEMI: Number(formData.personalLoanEMI) || 0,
                    autoLoanEMI: Number(formData.autoLoanEMI) || 0,
                    existingMortgageEMI: Number(formData.existingMortgageEMI) || 0,
                    stressRate: 2, // 2% standard stress rate
                    totalLiability: formData.totalLiability,
                    dbr: 0 // This will be calculated in the eligibility calculator
                }
            });
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Liabilities</h2>
                    <p className="text-gray-600 mt-2 text-lg">Please provide your current liabilities</p>
                </div>

                <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <label className="flex items-center space-x-3 mb-4">
                            <input
                                type="checkbox"
                                name="hasCreditCards"
                                checked={formData.hasCreditCards}
                                onChange={handleChange}
                                className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <span className="text-lg text-gray-700">Do you have any credit cards?</span>
                        </label>

                        {formData.hasCreditCards && (
                            <div className="ml-8">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Credit Card Limit
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="creditCardLimit"
                                        value={formData.creditCardLimit}
                                        onChange={handleChange}
                                        className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary ${
                                            errors.creditCardLimit ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter total credit limit"
                                    />
                                    <span className="absolute right-4 top-4 text-gray-500">AED</span>
                                </div>
                                {errors.creditCardLimit && (
                                    <p className="mt-2 text-sm text-red-500">{errors.creditCardLimit}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Personal Loan EMI
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="personalLoanEMI"
                                    value={formData.personalLoanEMI}
                                    onChange={handleChange}
                                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary ${
                                        errors.personalLoanEMI ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Monthly EMI amount"
                                />
                                <span className="absolute right-4 top-4 text-gray-500">AED</span>
                            </div>
                            {errors.personalLoanEMI && (
                                <p className="mt-2 text-sm text-red-500">{errors.personalLoanEMI}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Auto Loan EMI
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="autoLoanEMI"
                                    value={formData.autoLoanEMI}
                                    onChange={handleChange}
                                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary ${
                                        errors.autoLoanEMI ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Monthly EMI amount"
                                />
                                <span className="absolute right-4 top-4 text-gray-500">AED</span>
                            </div>
                            {errors.autoLoanEMI && (
                                <p className="mt-2 text-sm text-red-500">{errors.autoLoanEMI}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Existing Mortgage EMI
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                name="existingMortgageEMI"
                                value={formData.existingMortgageEMI}
                                onChange={handleChange}
                                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary ${
                                    errors.existingMortgageEMI ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Monthly EMI amount"
                            />
                            <span className="absolute right-4 top-4 text-gray-500">AED</span>
                        </div>
                        {errors.existingMortgageEMI && (
                            <p className="mt-2 text-sm text-red-500">{errors.existingMortgageEMI}</p>
                        )}
                    </div>

                    <div className="bg-primary/5 p-6 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total Monthly Liabilities
                        </label>
                        <p className="text-3xl font-bold text-primary">
                            {formatCurrency(formData.totalLiability)}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            Including 5% of credit card limit and all EMIs
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex justify-between">
                    <button
                        onClick={onBack}
                        className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[150px]"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-w-[150px]"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Liabilities;