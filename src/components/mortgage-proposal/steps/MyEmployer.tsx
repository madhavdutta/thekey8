import React, { useState, useEffect } from 'react';
import GroupedSelect from  '../../ui/groupedSelect';
import { config } from '../../../config/index';
import { FormState } from '../../../types/mortgage-proposal/forms';

interface MyEmployerProps {
  onNext: (data: Partial<FormState>) => void;
  onBack: () => void;
  formState: FormState;
}

const MyEmployer: React.FC<MyEmployerProps> = ({ onNext, onBack, formState }) => {
  const [formData, setFormData] = useState({
    status: formState.employment?.status || 'Employed',
    employerName: formState.employment?.employerName || '',
    duration: formState.employment?.duration || 'Newly Joined' || 'Less than 6 months' || 'More than 6 months' || 'Less than 1 month' || '1-3 months' || '3-6 months' || '6-12 months' || 'More than 1 year',
    industry: formState.employment?.industry || '',
    position: formState.employment?.position || '',
    employmentType: formState.employment?.employmentType || 'Permanent',
    companyType: formState.employment?.companyType || '',
    // Additional fields for self-employed
    businessName: formState.employment?.businessName || '',
    tradeLicenseNumber: formState.employment?.tradeLicenseNumber || '',
    businessStartDate: formState.employment?.businessStartDate || '',
    annualTurnover: formState.employment?.annualTurnover || '',
    numberOfEmployees: formState.employment?.numberOfEmployees || '',
    // Additional fields for unemployed
    lastEmploymentDate: formState.employment?.lastEmploymentDate || '',
    reasonForUnemployment: formState.employment?.reasonForUnemployment || '',
    previousEmployer: formState.employment?.previousEmployer || '',
    previousEmploymentDuration: formState.employment?.previousEmploymentDuration || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    // Reset form fields when employment status changes
    setFormData(prev => ({
      ...prev,
      employerName: '',
      duration: 'Newly Joined',
      position: '',
      employmentType: 'Permanent',
      companyType: '',
      businessName: '',
      tradeLicenseNumber: '',
      businessStartDate: '',
      annualTurnover: '',
      numberOfEmployees: '',
      lastEmploymentDate: '',
      reasonForUnemployment: '',
      previousEmployer: ''
    }));
    setErrors({});
    setWarnings({});
  }, [formData.status]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const newWarnings: Record<string, string> = {};
  
    // Common validation
    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }
  
    // Status-specific validation
    switch (formData.status) {
      case 'Employed':
        if (!formData.employerName.trim()) {
          newErrors.employerName = 'Employer name is required';
        }
        if (!formData.position.trim()) {
          newErrors.position = 'Position is required';
        }
        if (!formData.companyType) {
          newErrors.companyType = 'Company type is required';
        }
        if (formData.duration === 'Newly Joined' || formData.duration === 'Less than 6 months') {
          newWarnings.duration = 'Most banks require minimum 6 months of employment for mortgage approval';
        }
        if (formData.employmentType !== 'Permanent') {
          newWarnings.employmentType = 'Non-permanent employment may require additional documentation and affect loan eligibility';
        }
        break;
  
      case 'Self-Employed':
        if (!formData.businessName.trim()) {
          newErrors.businessName = 'Business name is required';
        }
        if (!formData.tradeLicenseNumber.trim()) {
          newErrors.tradeLicenseNumber = 'Trade license number is required';
        }
        if (!formData.businessStartDate) {
          newErrors.businessStartDate = 'Business start date is required';
        } else {
          const startDate = new Date(formData.businessStartDate);
          const twoYearsAgo = new Date();
          twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
          
          if (startDate > twoYearsAgo) {
            newErrors.businessStartDate = 'Business should be at least 2 years old for mortgage eligibility';
          }
        }
        if (!formData.annualTurnover) {
          newErrors.annualTurnover = 'Annual turnover is required';
        } else if (Number(formData.annualTurnover) < 500000) {
          newErrors.annualTurnover = 'Minimum annual turnover should be AED 500,000 for mortgage eligibility';
        }
        break;
  
      case 'Unemployed':
        if (!formData.duration) {
          newErrors.duration = 'Duration of unemployment is required';
        }
        if (formData.duration === 'More than 1 year') {
          newWarnings.duration = 'Long unemployment period significantly affects mortgage eligibility';
        }
        if (!formData.reasonForUnemployment) {
          newErrors.reasonForUnemployment = 'Reason for unemployment is required';
        }
        if (!formData.previousEmployer) {
          newErrors.previousEmployer = 'Previous employer details are required';
        }
        if (!formData.previousEmploymentDuration) {
          newErrors.previousEmploymentDuration = 'Previous employment duration is required';
        }
        newWarnings.status = 'Current unemployment status may significantly affect mortgage eligibility. Consider applying once employed.';
        break;
    }
  
    setErrors(newErrors);
    setWarnings(newWarnings);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error and warning when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (warnings[name]) {
      setWarnings(prev => ({ ...prev, [name]: '' }));
    }
  };

  const renderEmployedFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Employer Name
        </label>
        <input
          type="text"
          name="employerName"
          value={formData.employerName}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 ${
            errors.employerName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your employer's name"
        />
        {errors.employerName && (
          <p className="mt-1 text-sm text-red-500">{errors.employerName}</p>
        )}
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Employment Duration
        </label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 ${
            errors.duration ? 'border-red-500' : 'border-gray-300'
          }`}
        >
           <option value="Newly Joined">Newly Joined</option>
            <option value="Less than 6 months">Less than 6 months</option>
            <option value="6 months to 1 year">6 months to 1 year</option>
            <option value="1-2 years">More than 1 year</option>
        </select>
        {errors.duration && (
          <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
        )}
        {warnings.duration && (
          <p className="mt-1 text-sm text-yellow-600">{warnings.duration}</p>
        )}
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Position
        </label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
            errors.position ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your position"
        />
        {errors.position && (
          <p className="mt-1 text-sm text-red-500">{errors.position}</p>
        )}
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employment Type
          </label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary border-gray-300"
          >
            <option value="Permanent">Permanent</option>
            <option value="Contract">Contract</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Probation">Probation</option>
          </select>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Type
          </label>
          <select
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
              errors.companyType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Company Type</option>
            <option value="Government">Government</option>
            <option value="Semi-Government">Semi-Government</option>
            <option value="Private Limited">Private Limited</option>
            <option value="Public Limited">Public Limited</option>
            <option value="Multinational">Multinational</option>
            <option value="Free Zone">Free Zone</option>
          </select>
          {errors.companyType && (
            <p className="mt-1 text-sm text-red-500">{errors.companyType}</p>
          )}
        </div>
      </div>
    </>
  );


  const renderSelfEmployedFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Name
        </label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
            errors.businessName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your business name"
        />
        {errors.businessName && (
          <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trade License Number
        </label>
        <input
          type="text"
          name="tradeLicenseNumber"
          value={formData.tradeLicenseNumber}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
            errors.tradeLicenseNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter trade license number"
        />
        {errors.tradeLicenseNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.tradeLicenseNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Start Date
        </label>
        <input
          type="date"
          name="businessStartDate"
          value={formData.businessStartDate}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
            errors.businessStartDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.businessStartDate && (
          <p className="mt-1 text-sm text-red-500">{errors.businessStartDate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Annual Turnover (AED)
        </label>
        <input
          type="number"
          name="annualTurnover"
          value={formData.annualTurnover}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
            errors.annualTurnover ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter annual turnover"
          min="500000"
        />
        {errors.annualTurnover && (
          <p className="mt-1 text-sm text-red-500">{errors.annualTurnover}</p>
        )}
      </div>
    </>
  );

  const renderUnemployedFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duration of Unemployment
        </label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
            errors.duration ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="Less than 1 month">Less than 1 month</option>
          <option value="1-3 months">1-3 months</option>
          <option value="3-6 months">3-6 months</option>
          <option value="6-12 months">6-12 months</option>
          <option value="More than 1 year">More than 1 year</option>
        </select>
        {errors.duration && (
          <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
        )}
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reason for Unemployment
        </label>
        <select
          name="reasonForUnemployment"
          value={formData.reasonForUnemployment}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
            errors.reasonForUnemployment ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Reason</option>
          <option value="Resigned">Resigned</option>
          <option value="Contract Ended">Contract Ended</option>
          <option value="Company Closure">Company Closure</option>
          <option value="Redundancy">Redundancy</option>
          <option value="Other">Other</option>
        </select>
        {errors.reasonForUnemployment && (
          <p className="mt-1 text-sm text-red-500">{errors.reasonForUnemployment}</p>
        )}
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Previous Employer
        </label>
        <input
          type="text"
          name="previousEmployer"
          value={formData.previousEmployer}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${
            errors.previousEmployer ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter previous employer name"
        />
        {errors.previousEmployer && (
          <p className="mt-1 text-sm text-red-500">{errors.previousEmployer}</p>
        )}
      </div>
  
      {/* Add previous employment details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Previous Employment Duration
        </label>
        <select
          name="previousEmploymentDuration"
          value={formData.previousEmploymentDuration}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary border-gray-300"
        >
            <option value="Newly Joined">Newly Joined</option>
            <option value="Less than 6 months">Less than 6 months</option>
            <option value="6 months to 1 year">6 months to 1 year</option>
            <option value="1-2 years">More than 1 year</option>
        </select>
      </div>
    </>
  );


  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Employment Details</h2>
        <p className="text-gray-600 mt-1">Tell us about your current employment</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employment Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary border-gray-300"
          >
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
          {warnings.status && (
            <p className="mt-1 text-sm text-yellow-600">{warnings.status}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <GroupedSelect
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            groups={config.industries}
            placeholder="Select an industry"
            error={errors.industry}
          />
          {errors.industry && (
            <p className="mt-1 text-sm text-red-500">{errors.industry}</p>
          )}
        </div>

        {formData.status === 'Employed' && renderEmployedFields()}
        {formData.status === 'Self-Employed' && renderSelfEmployedFields()}
        {formData.status === 'Unemployed' && renderUnemployedFields()}
{/* Display Warnings */}
{Object.keys(warnings).length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1 11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.values(warnings).map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employment Type Info Panel - Show only for Employed status */}
        {formData.status === 'Employed' && (
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-primary mb-2">Employment Type Eligibility</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Permanent</p>
                <p className="text-gray-600">Most preferred by banks</p>
              </div>
              <div>
                <p className="font-medium">Contract</p>
                <p className="text-gray-600">May require additional documentation</p>
              </div>
              <div>
                <p className="font-medium">Probation</p>
                <p className="text-gray-600">Limited eligibility</p>
              </div>
              <div>
                <p className="font-medium">Part-Time</p>
                <p className="text-gray-600">Case by case basis</p>
              </div>
            </div>
          </div>
        )}

        {/* Self-Employed Info Panel */}
        {formData.status === 'Self-Employed' && (
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-primary mb-2">Required Documents</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Valid Trade License</li>
              <li>• Last 2 years audited financials</li>
              <li>• Bank statements for last 6 months</li>
              <li>• VAT Registration (if applicable)</li>
              <li>• Partnership deed (if applicable)</li>
            </ul>
          </div>
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (validateForm()) {
              onNext({ employment: formData });
            }
          }}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Next
        </button>
      </div>

      {/* Optional: Conditional Help Text */}
      <div className="mt-4 text-sm text-gray-500">
        {formData.status === 'Employed' && (
          <p>💡 Tip: Permanent employment with more than 1 year of service typically offers better loan terms.</p>
        )}
        {formData.status === 'Self-Employed' && (
          <p>💡 Tip: Having up-to-date financial documents and a good business track record improves your chances.</p>
        )}
        {formData.status === 'Unemployed' && (
          <p>⚠️ Note: Most banks require stable employment for mortgage approval. Please consult with our advisors.</p>
        )}
      </div>
    </div>
  );
};

export default MyEmployer;