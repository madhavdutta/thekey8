import { GroupedSelectOption } from "../types/mortgage-proposal/config";

// config/positions.ts
export const positions: GroupedSelectOption[] = [
    {
        label: 'Management',
        options: [
            { label: 'CEO', value: 'ceo' },
            { label: 'Director', value: 'director' },
            { label: 'Manager', value: 'manager' },
        ]
    },
    {
        label: 'Professional',
        options: [
            { label: 'Engineer', value: 'engineer' },
            { label: 'Doctor', value: 'doctor' },
            { label: 'Accountant', value: 'accountant' },
        ]
    },
    // ... add more positions
];