import { GroupedSelectOption } from "../types/mortgage-proposal/config";

export const companies: GroupedSelectOption[] = [
    {
        label: 'Banks',
        options: [
            { label: 'Emirates NBD', value: 'enbd' },
            { label: 'Abu Dhabi Commercial Bank', value: 'adcb' },
            { label: 'First Abu Dhabi Bank', value: 'fab' },
        ]
    },
    {
        label: 'Government',
        options: [
            { label: 'Dubai Municipality', value: 'dm' },
            { label: 'RTA', value: 'rta' },
            { label: 'DEWA', value: 'dewa' },
        ]
    },
    // ... add more companies
];