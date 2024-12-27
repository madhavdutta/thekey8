import React, { useState } from 'react';
import { FormState } from '../../../types/mortgage-proposal/forms';

interface FinancialRequirementProps {
  onNext: (data: Partial<FormState>) => void;
  onBack: () => void;
  formState: FormState;
}

const FinancialRequirement: React.FC<FinancialRequirementProps> = ({ onNext, onBack, formState }) => {
  const [formData, setFormData] = useState({
    purpose: formState.financialRequirement?.purpose || '',
    mortgageType: formState.financialRequirement?.mortgageType || '',
    salaryTransfer: formState.financialRequirement?.salaryTransfer || false,
    feeFinancing: formState.financialRequirement?.feeFinancing || false,
    ratePreference: formState.financialRequirement?.ratePreference || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.purpose) {
      newErrors.purpose = 'Please select your purpose';
    }
    if (!formData.mortgageType) {
      newErrors.mortgageType = 'Please select mortgage type';
    }
    if (!formData.ratePreference) {
      newErrors.ratePreference = 'Please select rate preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext({
        financialRequirement: {
          ...formData
        }
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Financial Requirements</h2>
        <p className="text-gray-600 mt-1">Tell us about your mortgage preferences</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What are you looking for?
          </label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.purpose ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Purpose</option>
            <option value="New Purchase">Buying a New Property</option>
            <option value="Refinance">Refinance Existing Mortgage</option>
            <option value="Equity Release">Equity Release</option>
            <option value="Off Plan">Off Plan Property</option>
          </select>
          {errors.purpose && (
            <p className="mt-1 text-sm text-red-500">{errors.purpose}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mortgage Type
          </label>
          <select
            name="mortgageType"
            value={formData.mortgageType}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.mortgageType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Mortgage Type</option>
            <option value="Islamic">Islamic</option>
            <option value="Conventional">Conventional</option>
          </select>
          {errors.mortgageType && (
            <p className="mt-1 text-sm text-red-500">{errors.mortgageType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rate Preference
          </label>
          <select
            name="ratePreference"
            value={formData.ratePreference}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.ratePreference ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Rate Preference</option>
            <option value="Fixed">Fixed Rate</option>
            <option value="Variable">Variable Rate</option>
          </select>
          {errors.ratePreference && (
            <p className="mt-1 text-sm text-red-500">{errors.ratePreference}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700">I agree to transfer my salary</span>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
              <input
                type="checkbox"
                name="salaryTransfer"
                checked={formData.salaryTransfer}
                onChange={handleChange}
                className="hidden"
                id="salaryTransfer"
              />
              <label
                htmlFor="salaryTransfer"
                className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ease-in-out ${
                  formData.salaryTransfer ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    formData.salaryTransfer ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700">I would like to finance the fees</span>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
              <input
                type="checkbox"
                name="feeFinancing"
                checked={formData.feeFinancing}
                onChange={handleChange}
                className="hidden"
                id="feeFinancing"
              />
              <label
                htmlFor="feeFinancing"
                className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ease-in-out ${
                  formData.feeFinancing ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    formData.feeFinancing ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FinancialRequirement;