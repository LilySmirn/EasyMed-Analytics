"use client";

import { CalendarPopover } from "@/components/CalendarFilter";
import { FilterSelect } from "@/components/FilterSelect";
import { ModeToggle } from "@/components/ModeToggle";
import { useFilters } from "@/context/FiltersContext";
import { useMode } from "@/context/ModeContext";

export function TopFilters() {
    const { setFilter, filters } = useFilters();
    const { mode, setMode, isReady } = useMode();

    if (!isReady) return <div className="h-20 bg-gray-100 dark:bg-gray-900" />;

    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex flex-wrap items-start justify-between gap-x-6 gap-y-3 px-6 py-3 shadow-sm">
            <div className="flex min-w-0 flex-1 flex-wrap items-start gap-x-4 gap-y-3">
                <CalendarPopover />

                <FilterSelect
                    label="Специальность"
                    value={filters.specialty || "all"}
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
                    value={filters.type || "all"}
                    options={[
                        { value: "all", label: "Все" },
                        { value: "first", label: "Первичный" },
                        { value: "second", label: "Повторный" },
                    ]}
                    onChange={(v) => setFilter("type", v)}
                />

                <FilterSelect
                    label="Филиал"
                    value={filters.branch || "all"}
                    onChange={(v) => setFilter("branch", v)}
                    options={[
                        { value: "all", label: "Все филиалы" },
                        { value: "Филиал 1", label: "Филиал 1" },
                        { value: "Филиал 2", label: "Филиал 2" },
                        { value: "Филиал 3", label: "Филиал 3" },
                    ]}
                />

                <FilterSelect
                    label="Врач"
                    value={filters.doctor || "all"}
                    onChange={(v) => setFilter("doctor", v)}
                    options={[
                        { value: "all", label: "Все врачи" },
                        { value: "иванов", label: "Иванов" },
                        { value: "петров", label: "Петров" },
                        { value: "сидоров", label: "Сидоров" },
                        { value: "смирнова", label: "Смирнова" },
                    ]}
                />

                <FilterSelect
                    label="ДМС"
                    value={filters.insurance || "all"}
                    onChange={(v) => setFilter("insurance", v)}
                    options={[
                        { value: "all", label: "Все" },
                        { value: "insurance", label: "По страховым" },
                        { value: "self", label: "За свой счёт" },
                    ]}
                />

                <FilterSelect
                    label="Вид услуг"
                    value={filters.serviceType || "all"}
                    onChange={(v) => setFilter("serviceType", v)}
                    options={[
                        { value: "all", label: "Все" },
                        { value: "required", label: "Обязательные" },
                        { value: "indicated", label: "По показаниям" },
                    ]}
                />

                <FilterSelect
                    label="EasyMed"
                    value={filters.easyMed || "all"}
                    onChange={(v) => setFilter("easyMed", v)}
                    options={[
                        { value: "all", label: "Все" },
                        { value: "with", label: "С EasyMed" },
                        { value: "without", label: "Без EasyMed" },
                    ]}
                />


            </div>

            <div className="mt-6 shrink-0 self-start">
                <ModeToggle value={mode} onChange={setMode} />
            </div>
        </div>
    );
}
