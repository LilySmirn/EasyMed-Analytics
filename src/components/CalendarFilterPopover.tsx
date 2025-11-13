"use client"

import React from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/Popover"
import { Button } from "@/components/Button"
import { Calendar } from "@/components/Calendar"
import { DateRange } from "react-day-picker"

export const CalendarPopover = () => {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="secondary">
                    {dateRange
                        ? `${dateRange.from?.toLocaleDateString()} – ${dateRange.to?.toLocaleDateString() ?? ""}`
                        : "Выбрать даты"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 w-auto">
                <Calendar
                    mode="range"
                    numberOfMonths={2}
                    selected={dateRange}
                    onSelect={setDateRange}
                />
            </PopoverContent>
        </Popover>
    )
}
