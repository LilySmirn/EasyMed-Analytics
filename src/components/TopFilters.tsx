"use client";

import { FilterSelect } from "@/components/FilterSelect";
import { useFilters } from "@/context/FiltersContext";
import { CalendarPopover } from "@/components/CalendarFilter";

export function TopFilters() {
    const { setFilter, filters } = useFilters();

    return (
        <div className="h-20 bg-gray-100 dark:bg-gray-900 flex items-center gap-4 px-6 shadow-sm overflow-x-auto">
            <CalendarPopover />

            <FilterSelect
                label="Специальность"
                defaultValue={filters.specialty || "all"}
                onChange={(v) => setFilter("specialty", v)}
                options={[
                    { value: "all", label: "Все специальности" },
                    { value: "терапевт", label: "Терапевт" },
                    { value: "кардиолог", label: "Кардиолог" },
                    { value: "эндокринолог", label: "Эндокринолог" },
                ]}
            />

            <FilterSelect
                label="Вид приёма"
                defaultValue="all"
                options={[
                    { value: "all", label: "Все" },
                    { value: "first", label: "Первичный" },
                    { value: "second", label: "Повторный" },
                ]}
                onChange={(v) => setFilter("type", v)}
            />

            <FilterSelect
                label="Филиалы"
                defaultValue={filters.specialty || "all"}
                onChange={(v) => setFilter("specialty", v)}
                options={[
                    { value: "all", label: "Все филиалы" },
                    { value: "Филиал 1", label: "Филиал 1" },
                    { value: "Филиал 2", label: "Филиал 2" },
                    { value: "Филиал 3", label: "Филиал 3" },
                ]}
            />
        </div>
    );
}
