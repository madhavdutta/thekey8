import React, { useState } from 'react';
import { FormState } from '../../../types/mortgage-proposal/forms';

interface PropertyDetailsProps {
    onNext: (data: Partial<FormState>) => void;
    onBack: () => void;
    formState: FormState;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ onNext, onBack, formState }) => {
    const [formData, setFormData] = useState({
        stage: formState.propertyDetails?.stage || 'Researching',
        type: formState.propertyDetails?.type || 'Completed',
        usage: formState.propertyDetails?.usage || 'Residential'
    });


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const updatedData: Partial<FormState> = {
            propertyDetails: {
                ...formState.propertyDetails,
                ...formData,
                // propertyValue: formState.financialRequirement.propertyPrice
            },
            // Preserve other important data
            aboutMe: formState.aboutMe,
            income: formState.income,
            financialRequirement: formState.financialRequirement
        };

        console.log('Property Details - Submitting Data:', updatedData);
        onNext(updatedData);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Property Details</h2>
                    <p className="text-gray-600 mt-2 text-lg">Tell us about the property you're interested in</p>

                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Stage
                            </label>
                            <select
                                name="stage"
                                value={formData.stage}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Researching">Still Researching</option>
                                <option value="Viewing">Viewing Properties</option>
                                <option value="Made Offer">Made an Offer</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Completed">Completed</option>
                                <option value="Off Plan">Off Plan</option>
                                <option value="Under Construction">Under Construction</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Usage
                        </label>
                        <select
                            name="usage"
                            value={formData.usage}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Mixed Use">Mixed Use</option>
                        </select>
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
                        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;