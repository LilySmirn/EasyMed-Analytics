"use client";

import { FilterSelect } from "@/components/FilterSelect";

export function TopFilters() {
    return (
        <div className="h-20 bg-gray-100 dark:bg-gray-900 flex items-center gap-4 px-6 shadow-sm overflow-x-auto">
            <FilterSelect
                label="Дата"
                defaultValue="all"
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
                defaultValue="all"
                options={[
                    { value: "all", label: "Все специалисты" },
                    { value: "doctor1", label: "Терапевт" },
                    { value: "doctor2", label: "Кардиолог" },
                    { value: "doctor3", label: "Эндокринолог" },
                ]}
            />

            <FilterSelect
                label="Вид приёма"
                defaultValue="all"
                options={[
                    { value: "all", label: "Все" },
                    { value: "first", label: "Первичный" },
                    { value: "second", label: "Вторичный" },
                ]}
            />

        </div>
    );
}
