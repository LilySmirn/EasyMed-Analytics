"use client";

import { useMemo, useState } from "react";
import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react";

import { Button } from "@/components/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { cx } from "@/lib/utils";

interface FilterOption {
    value: string;
    label: string;
}

interface FilterSelectProps {
    label: string;
    options: FilterOption[];
    value?: string;
    values?: string[];
    onChange?: (value: string) => void;
    onMultiChange?: (values: string[]) => void;
    multiple?: boolean;
}

export function FilterSelect({
                                 label,
                                 options,
                                 value,
                                 values = [],
                                 onChange,
                                 onMultiChange,
                                 multiple = false,
                             }: FilterSelectProps) {
    const [open, setOpen] = useState(false);

    const selectedLabel = useMemo(() => {
        if (!multiple) {
            return options.find((option) => option.value === value)?.label ?? label;
        }

        const selectedValues = values.filter((item) => item !== "all");
        if (selectedValues.length === 0) {
            return options[0]?.label ?? label;
        }

        const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
        if (selectedOptions.length === 1) {
            return selectedOptions[0].label;
        }

        return `Выбрано: ${selectedOptions.length}`;
    }, [label, multiple, options, value, values]);

    if (!multiple) {
        return (
            <div className="flex flex-col">
                <label className="mb-1 ml-1 text-sm text-gray-500">{label}</label>

                <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="w-48 border bg-white p-2 text-left rounded dark:bg-gray-800">
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

    const selectedValues = values.filter((item) => item !== "all");

    const toggleValue = (nextValue: string) => {
        if (!onMultiChange) return;

        if (nextValue === "all") {
            onMultiChange([]);
            return;
        }

        const isSelected = selectedValues.includes(nextValue);
        const nextValues = isSelected
            ? selectedValues.filter((item) => item !== nextValue)
            : [...selectedValues, nextValue];

        onMultiChange(nextValues);
    };

    return (
        <div className="flex flex-col">
            <label className="mb-1 ml-1 text-sm text-gray-500">{label}</label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-48 justify-between border bg-white px-3 py-2 text-left font-normal dark:bg-gray-800"
                    >
                        <span className="truncate">{selectedLabel}</span>
                        <RiArrowDownSLine className="size-4 shrink-0 text-gray-400" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-56 p-1">
                    <div className="max-h-72 overflow-y-auto">
                        {options.map((option) => {
                            const isAll = option.value === "all";
                            const checked = isAll ? selectedValues.length === 0 : selectedValues.includes(option.value);

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => toggleValue(option.value)}
                                    className={cx(
                                        "flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm transition-colors",
                                        "text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-900",
                                        checked && "font-medium"
                                    )}
                                >
                                    <span className="truncate">{option.label}</span>
                                    <span className="flex h-5 w-5 items-center justify-center">
                                        {checked ? <RiCheckLine className="size-4" /> : null}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
