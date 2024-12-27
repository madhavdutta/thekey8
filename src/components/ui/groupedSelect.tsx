// components/common/GroupedSelect.tsx
import React from 'react';

interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface GroupedOption {
    label: string;
    options: SelectOption[];
}

interface GroupedSelectProps {
    name: string;
    groups: GroupedOption[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    error?: string;
}

const GroupedSelect: React.FC<GroupedSelectProps> = ({
    name,
    groups,
    value,
    onChange,
    placeholder = 'Select an option',
    disabled = false,
    className = '',
    error
}) => {
    return (
        <div>
            <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    disabled ? 'bg-gray-100' : 'bg-white'
                } ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
            >
                <option value="">{placeholder}</option>
                {groups.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                        {group.options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default GroupedSelect;