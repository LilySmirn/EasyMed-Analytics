"use client"

import React from "react"
import { startOfMonth, subMonths } from "date-fns"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/Popover"
import { Calendar } from "@/components/Calendar"
import { DateRange } from "react-day-picker"

function getDefaultDateRange(today: Date): DateRange {
    if (today.getDate() >= 5) {
        return {
            from: startOfMonth(today),
            to: today,
        };
    }

    return {
        from: subMonths(today, 1),
        to: today,
    };
}

export const CalendarPopover = () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(() => getDefaultDateRange(new Date()));

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
