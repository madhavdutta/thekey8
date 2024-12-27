import React, { useState, useEffect } from 'react';
import { FormState } from '../../../types/mortgage-proposal/forms';

interface IncomeProps {
    onNext: (data: Partial<FormState>) => void;
    onBack: () => void;
    formState: FormState;
}

const Step2Income: React.FC<IncomeProps> = ({ onNext, onBack, formState }) => {
    const [formData, setFormData] = useState({
        monthlySalary: formState.income?.monthlySalary || '',
        bonus: formState.income?.otherIncome?.bonus || '',
        commission: formState.income?.otherIncome?.commission || '',
        rentalIncome: formState.income?.otherIncome?.rental || '',
        otherIncome: formState.income?.otherIncome?.other || ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0);

    useEffect(() => {
        const total = 
            Number(formData.monthlySalary || 0) +
            Number(formData.bonus || 0) / 12 + // Annual bonus converted to monthly
            Number(formData.commission || 0) +
            Number(formData.rentalIncome || 0) +
            Number(formData.otherIncome || 0);

        setTotalMonthlyIncome(total);
    }, [formData]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.monthlySalary) {
            newErrors.monthlySalary = 'Monthly salary is required';
        } else if (Number(formData.monthlySalary) < 15000) {
            newErrors.monthlySalary = 'Minimum monthly salary should be AED 15,000';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
          onNext({
            income: {
              monthlySalary: Number(formData.monthlySalary),
              otherIncome: {
                bonus: Number(formData.bonus || 0),
                commission: Number(formData.commission || 0),
                rental: Number(formData.rentalIncome || 0),
                other: Number(formData.otherIncome || 0)
              },
              totalIncome: totalMonthlyIncome
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

    const renderIncomeInput = (
        name: string,
        label: string,
        placeholder: string,
        isRequired: boolean = false
    ) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input
                    type="number"
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary ${
                        errors[name] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={placeholder}
                />
                <span className="absolute right-4 top-4 text-gray-500">AED</span>
            </div>
            {errors[name] && (
                <p className="mt-2 text-sm text-red-500">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Income Details</h2>
                    <p className="text-gray-600 mt-2 text-lg">
                        Please provide your monthly income details
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Required Income */}
                    <div>
                        {renderIncomeInput(
                            'monthlySalary',
                            'Monthly Basic Salary',
                            'Enter your monthly salary',
                            true
                        )}
                        {totalMonthlyIncome < 15000 && formData.monthlySalary && (
                            <p className="mt-2 text-sm text-yellow-600">
                                Total monthly income should be at least AED 15,000 for mortgage eligibility
                            </p>
                        )}
                    </div>

                    {/* Additional Income Section */}
                    <div className="bg-gray-50 p-6 rounded-lg space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Additional Income (Optional)</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderIncomeInput(
                                'bonus',
                                'Annual Bonus',
                                'Enter your annual bonus'
                            )}
                            {renderIncomeInput(
                                'commission',
                                'Monthly Commission',
                                'Enter your monthly commission'
                            )}
                            {renderIncomeInput(
                                'rentalIncome',
                                'Monthly Rental Income',
                                'Enter your rental income'
                            )}
                            {renderIncomeInput(
                                'otherIncome',
                                'Other Monthly Income',
                                'Enter any other income'
                            )}
                        </div>
                    </div>

                    {/* Total Income Summary */}
                    <div className="bg-primary/5 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Total Monthly Income
                        </h3>
                        <p className="text-3xl font-bold text-primary">
                            {formatCurrency(totalMonthlyIncome)}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            Including base salary and all additional income sources
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

export default Step2Income;