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
        <div className="bg-gray-100 dark:bg-gray-900 flex items-start justify-between px-6 py-3 shadow-sm overflow-x-auto gap-6">
            <div className="flex flex-col gap-3 min-w-max">
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

                    <FilterSelect
                        label="Врач"
                        defaultValue={filters.doctor || "all"}
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
                        defaultValue={filters.insurance || "all"}
                        onChange={(v) => setFilter("insurance", v)}
                        options={[
                            { value: "all", label: "Все" },
                            { value: "insurance", label: "По страховым" },
                            { value: "self", label: "За свой счёт" },
                        ]}
                    />

                    <FilterSelect
                        label="Вид услуг"
                        defaultValue={filters.serviceType || "all"}
                        onChange={(v) => setFilter("serviceType", v)}
                        options={[
                            { value: "all", label: "Все" },
                            { value: "required", label: "Обязательные" },
                            { value: "indicated", label: "По показаниям" },
                        ]}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <FilterSelect
                        label="EasyMed"
                        defaultValue={filters.easyMed || "all"}
                        onChange={(v) => setFilter("easyMed", v)}
                        options={[
                            { value: "all", label: "Все" },
                            { value: "with", label: "С EasyMed" },
                            { value: "without", label: "Без EasyMed" },
                        ]}
                    />

                    <FilterSelect
                        label="Категория услуг"
                        defaultValue={filters.serviceCategory || "all"}
                        onChange={(v) => setFilter("serviceCategory", v)}
                        options={[
                            { value: "all", label: "Все категории" },
                            { value: "vaccination", label: "Вакцинация" },
                            { value: "gastroenterology", label: "Гастроэнтерология" },
                            { value: "gynecology", label: "Гинекология" },
                            { value: "dermatovenereology", label: "Дерматовенерология" },
                            { value: "laboratory", label: "Лаборатория" },
                            { value: "ultrasound", label: "УЗИ" },
                            { value: "ct", label: "КТ" },
                        ]}
                    />
                </div>
            </div>

            <div className="self-start mt-6">
                <ModeToggle value={mode} onChange={setMode} />
            </div>
        </div>
    );
}
