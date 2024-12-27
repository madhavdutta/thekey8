// types/config.d.ts


export interface GroupedSelectOption {
    label: string;
    options: SelectOption[];
}

export interface ConfigTypes {
    nationalities: SelectOption[];
    industries: GroupedSelectOption[];
    companies: GroupedSelectOption[];
    developers: SelectOption[];
    properties: GroupedSelectOption[];
    banks: SelectOption[];
    emirates: SelectOption[];
    employmentTypes: SelectOption[];
    companyTypes: SelectOption[];
    positions: GroupedSelectOption[];
    propertyTypes: GroupedSelectOption[];
}


export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export type NationalitiesConfig = SelectOption[];
export type IndustriesConfig = SelectOption[];