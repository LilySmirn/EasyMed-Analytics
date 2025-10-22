"use client";

import { FilterSelect } from "@/components/FilterSelect";
import { useFilters } from "@/context/FiltersContext";

export function TopFilters() {
    const { setFilter, filters } = useFilters();

    return (
        <div className="h-20 bg-gray-100 dark:bg-gray-900 flex items-center gap-4 px-6 shadow-sm overflow-x-auto">
            <FilterSelect
                label="Дата"
                defaultValue={filters.date || "all"}
                onChange={(v) => setFilter("date", v)}
                options={[
                    { value: "all", label: "За всё время" },
                    { value: "june", label: "Июнь" },
                    { value: "july", label: "Июль" },
                    { value: "august", label: "Август" },
                    { value: "september", label: "Сентябрь" },
                    { value: "october", label: "Октябрь" },
                ]}
            />

            <FilterSelect
                label="Специальность"
                defaultValue={filters.specialty || "all"}
                onChange={(v) => setFilter("specialty", v)}
                options={[
                    { value: "all", label: "Все специалисты" },
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
        </div>
    );
}
