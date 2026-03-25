"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/Popover";
import { Calendar } from "@/components/Calendar";
import { useFilters } from "@/context/FiltersContext";

export const CalendarPopover = () => {
    const { dateRange, setDateRange } = useFilters();

    const buttonLabel = dateRange
        ? `${dateRange.from?.toLocaleDateString()} – ${dateRange.to?.toLocaleDateString() ?? ""}`
        : "Выбрать даты";

    return (
        <div className="flex flex-col w-48">
            <span className="text-sm text-gray-500 mb-1 ml-1">
                Даты
            </span>

            <Popover>
                <PopoverTrigger asChild>
                    <button className="w-48 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-left">
                        {buttonLabel}
                    </button>
                </PopoverTrigger>

                <PopoverContent className="p-2">
                    <Calendar
                        mode="range"
                        numberOfMonths={2}
                        selected={dateRange}
                        onSelect={setDateRange}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
