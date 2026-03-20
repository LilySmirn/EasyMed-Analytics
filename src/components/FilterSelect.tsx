"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RiArrowDownSLine, RiCheckLine, RiSearchLine } from "@remixicon/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { cx, focusInput } from "@/lib/utils";

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

const isSearchableKey = (key: string) => key.length === 1 && !/[^\w\sа-яё-]/i.test(key);

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
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

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

    const normalizedQuery = query.trim().toLocaleLowerCase("ru-RU");

    const filteredOptions = useMemo(() => {
        if (!normalizedQuery) {
            return options;
        }

        const startsWith = options.filter((option) => option.label.toLocaleLowerCase("ru-RU").startsWith(normalizedQuery));
        const contains = options.filter((option) => {
            const normalizedLabel = option.label.toLocaleLowerCase("ru-RU");
            return !normalizedLabel.startsWith(normalizedQuery) && normalizedLabel.includes(normalizedQuery);
        });

        return [...startsWith, ...contains];
    }, [normalizedQuery, options]);

    useEffect(() => {
        if (!open) {
            setQuery("");
            return;
        }

        const timeoutId = window.setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(query.length, query.length);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [open, query.length]);

    const selectedValues = values.filter((item) => item !== "all");

    const toggleValue = (nextValue: string) => {
        if (multiple) {
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
            return;
        }

        onChange?.(nextValue);
        setOpen(false);
    };

    const startSearchFromKeyboard = (key: string) => {
        setOpen(true);
        setQuery((current) => `${current}${key}`);
    };

    const handleClosedTriggerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isSearchableKey(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault();
            startSearchFromKeyboard(event.key);
            return;
        }

        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
        }
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
        }
    };

    return (
        <div className="flex flex-col">
            <label className="mb-1 ml-1 text-sm text-gray-500">{label}</label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div
                        role="combobox"
                        aria-expanded={open}
                        tabIndex={0}
                        onKeyDown={!open ? handleClosedTriggerKeyDown : undefined}
                        className={cx(
                            "flex h-10 w-48 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-xs outline-hidden transition dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50",
                            "hover:bg-gray-50 dark:hover:bg-gray-900/60",
                            open && "border-blue-500 ring-2 ring-blue-200 dark:border-blue-700 dark:ring-blue-700/30",
                            !open && focusInput
                        )}
                    >
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                            {open ? <RiSearchLine className="size-4 shrink-0 text-blue-500" /> : null}

                            {open ? (
                                <div className="flex min-w-0 flex-1 items-center">
                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        onKeyDown={handleInputKeyDown}
                                        placeholder="Введите для поиска"
                                        className="w-full appearance-none border-0 bg-transparent p-0 text-sm text-gray-900 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:text-gray-400 dark:text-gray-50"
                                    />
                                    <span aria-hidden="true" className="h-4 w-px shrink-0 animate-pulse bg-blue-500" />
                                </div>
                            ) : (
                                <span className="truncate">{selectedLabel}</span>
                            )}
                        </div>

                        <RiArrowDownSLine className="size-4 shrink-0 text-gray-400" />
                    </div>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-64 p-2">
                    <div className="space-y-2">

                        <div className="max-h-72 overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => {
                                    const isAll = option.value === "all";
                                    const checked = multiple
                                        ? (isAll ? selectedValues.length === 0 : selectedValues.includes(option.value))
                                        : value === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => toggleValue(option.value)}
                                            className={cx(
                                                "flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm transition-colors",
                                                "text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-900",
                                                checked && "bg-gray-100 font-medium dark:bg-gray-900"
                                            )}
                                        >
                                            <span className="truncate">{option.label}</span>
                                            <span className="flex h-5 w-5 items-center justify-center">
                                                {checked ? <RiCheckLine className="size-4" /> : null}
                                            </span>
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="px-3 py-6 text-center text-sm text-gray-500">
                                    Ничего не найдено по запросу «{query}»
                                </div>
                            )}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
