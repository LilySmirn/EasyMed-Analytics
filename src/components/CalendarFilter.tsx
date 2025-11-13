"use client"

import React from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/Popover"
import { Calendar } from "@/components/Calendar"
import { DateRange } from "react-day-picker"

export const CalendarPopover = () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

    const buttonLabel = dateRange
        ? `${dateRange.from?.toLocaleDateString()} – ${dateRange.to?.toLocaleDateString() ?? ""}`
        : "Выбрать даты";

    return (
        <div className="flex flex-col">
            {/* Label сверху */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Даты
      </span>

            <Popover>
                <PopoverTrigger asChild>
                    <button className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
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
