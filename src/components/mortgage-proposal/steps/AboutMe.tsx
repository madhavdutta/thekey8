import React from 'react';
import { FormState } from '../../../types/mortgage-proposal/forms';
import { config } from '../../../config/index';
import SearchableSelect from '../../ui/searchableSelect';

// import { useFormContext } from '../context/FormContext';

interface AboutMeProps {
  onNext: (data: Partial<FormState>) => void;
  formState: FormState;
}

const AboutMe: React.FC<AboutMeProps> = ({ onNext, formState }) => {
  const [formData, setFormData] = React.useState({
    firstName: formState.aboutMe?.firstName || '',
    lastName: formState.aboutMe?.lastName || '',
    age: formState.aboutMe?.age || 0,
    residencyStatus: formState.aboutMe?.residencyStatus || '',
    applicationType: formState.aboutMe?.applicationType || 'Single',
    nationality: formState.aboutMe?.nationality || ''
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (formData.age && (formData.age < 21 || formData.age > 65)) {
      newErrors.age = 'Age must be between 21 and 65';
    }
    if (!formData.residencyStatus) newErrors.residencyStatus = 'Residency status is required';
    if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext({
        aboutMe: {
          ...formData,
          age: Number(formData.age) // Explicit conversion
        }
      });
    }
  };
  

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
        <p className="text-gray-600 mt-1">Please provide your personal details</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-500">{errors.age}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Must be between 21 and 65 years old
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Residency Status
          </label>
          <select
            name="residencyStatus"
            value={formData.residencyStatus}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.residencyStatus ? 'border-red-500' : 'border-gray-300'
              }`}
          >
            <option value="">Select Residency Status</option>
            <option value="UAE National">UAE National</option>
            <option value="UAE Resident">UAE Resident</option>
            <option value="Non-resident">Non-resident</option>
          </select>
          {errors.residencyStatus && (
            <p className="mt-1 text-sm text-red-500">{errors.residencyStatus}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="applicationType"
                value="Single"
                checked={formData.applicationType === 'Single'}
                onChange={handleChange}
                className="mr-2"
              />
              Single Applicant
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="applicationType"
                value="Joint"
                checked={formData.applicationType === 'Joint'}
                onChange={handleChange}
                className="mr-2"
              />
              Joint Applicant
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationality
          </label>
       

          <SearchableSelect
            name="nationality"
            options={Array.from(config.nationalities)}
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Select nationality"
            error={errors.nationality}
          />

          {errors.nationality && (
            <p className="mt-1 text-sm text-red-500">{errors.nationality}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AboutMe;