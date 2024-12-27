import { GroupedSelectOption } from "../types/mortgage-proposal/config";

export const propertyTypes: GroupedSelectOption[] = [
    {
        label: 'Residential',
        options: [
            { label: 'Apartment', value: 'apartment' },
            { label: 'Villa', value: 'villa' },
            { label: 'Townhouse', value: 'townhouse' },
            { label: 'Penthouse', value: 'penthouse' },
        ]
    },
    {
        label: 'Commercial',
        options: [
            { label: 'Office', value: 'office' },
            { label: 'Retail', value: 'retail' },
            { label: 'Warehouse', value: 'warehouse' },
        ]
    },
    // ... add more property types
];
