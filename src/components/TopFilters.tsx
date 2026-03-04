"use client";

import { FilterSelect } from "@/components/FilterSelect";
import { CalendarPopover } from "@/components/CalendarFilter";
import { ModeToggle } from "@/components/ModeToggle";
import { useFilters } from "@/context/FiltersContext";
import { useMode } from "@/context/ModeContext";

export function TopFilters() {
    const { setFilter, filters } = useFilters();
    const { mode, setMode, isReady } = useMode();

    if (!isReady) return <div className="h-20 bg-gray-100 dark:bg-gray-900" />;

    return (
        <div className="h-20 bg-gray-100 dark:bg-gray-900 flex items-center justify-between px-6 shadow-sm overflow-x-auto">
            <div className="flex items-center gap-4">
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
                        { value: "пульмонолог", label: "Пульмонолог" },
                    ]}
                />

                <FilterSelect
                    label="Тип приёма"
                    defaultValue={filters.type || "all"}
                    options={[
                        { value: "all", label: "Все" },
                        { value: "first", label: "Первичный" },
                        { value: "second", label: "Повторный" },
                    ]}
                    onChange={(v) => setFilter("type", v)}
                />

                <FilterSelect
                    label="Филиалы"
                    defaultValue={filters.branch || "all"}
                    onChange={(v) => setFilter("branch", v)}
                    options={[
                        { value: "all", label: "Все филиалы" },
                        { value: "Филиал 1", label: "Филиал 1" },
                        { value: "Филиал 2", label: "Филиал 2" },
                        { value: "Филиал 3", label: "Филиал 3" },
                    ]}
                />
            </div>

            <ModeToggle value={mode} onChange={setMode} />
        </div>
    );
}
