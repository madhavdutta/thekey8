import { GroupedSelectOption } from "../types/mortgage-proposal/config";

export const industries: GroupedSelectOption[] = [
    {
        label: 'Financial Services',
        options: [
            { label: 'Banking', value: 'banking' },
            { label: 'Insurance', value: 'insurance' },
            { label: 'Investment', value: 'investment' },
        ]
    },
    {
        label: 'Technology',
        options: [
            { label: 'Software', value: 'software' },
            { label: 'IT Services', value: 'it_services' },
            { label: 'Telecommunications', value: 'telecommunications' },
        ]
    },
    {
        label: 'Healthcare',
        options: [
            { label: 'Healthcare', value: 'healthcare' },
            { label: 'Pharmaceuticals', value: 'pharmaceuticals' },
            { label: 'Medical Devices', value: 'medical_devices' },
        ]
    },
    {
        label: 'Energy',
        options: [
            { label: 'Energy', value: 'energy' },
            { label: 'Oil & Gas', value: 'oil_and_gas' },
            { label: 'Renewable Energy', value: 'renewable_energy' },
        ]
    },
    {
        label: 'Manufacturing',
        options: [
            { label: 'Manufacturing', value: 'manufacturing' },
            { label: 'Automotive', value: 'automotive' },
            { label: 'Chemicals', value: 'chemicals' },
        ]
    },
    {
        label: 'Retail',
        options: [
            { label: 'Retail', value: 'retail' },
            { label: 'Apparel', value: 'apparel' },
            { label: 'Fashion', value: 'fashion' },
        ]
    },
    {
        label: 'Media',
        options: [
            { label: 'Media', value: 'media' },
            { label: 'Publishing', value: 'publishing' },
            { label: 'Advertising', value: 'advertising' },
        ]    
    },
    {
        label: 'Real Estate',
        options: [
            { label: 'Real Estate', value: 'real_estate' },
            { label: 'Development', value: 'development' },
            { label: 'Property Management', value: 'property_management' },
        ]
    },
    {
        label: 'Transportation',
        options: [
            { label: 'Transportation', value: 'transportation' },
            { label: 'Airports', value: 'airports' },
            { label: 'Logistics', value: 'logistics' },
        ]    
    },
    {
        label: 'Utilities',
        options: [
            { label: 'Utilities', value: 'utilities' },
            { label: 'Power', value: 'power' },
            { label: 'Water', value: 'water' },
        ]    
    },
    {
            label: 'Other',
            options: [
                { label: 'Other', value: 'other' },
            ]    
    },
]