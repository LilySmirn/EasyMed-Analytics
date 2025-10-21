"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select";

interface FilterSelectProps {
    label: string;
    options: { value: string; label: string }[];
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export function FilterSelect({
                                 label,
                                 options,
                                 defaultValue,
                                 onChange,
                             }: FilterSelectProps) {
    return (
        <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1 ml-1">{label}</label>

            <Select defaultValue={defaultValue} onValueChange={onChange}>
                <SelectTrigger className="w-48 p-2 border rounded bg-white dark:bg-gray-800 text-left">
                    <SelectValue placeholder={label} />
                </SelectTrigger>

                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
