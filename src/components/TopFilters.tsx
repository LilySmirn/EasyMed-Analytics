"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CalendarPopover } from "@/components/CalendarFilter";
import { FilterSelect } from "@/components/FilterSelect";
import { ModeToggle } from "@/components/ModeToggle";
import { useFilters } from "@/context/FiltersContext";
import { useMode } from "@/context/ModeContext";
import { buildDoctorFilterOptions } from "@/utils/doctorFilterOptions";
import { buildUrlWithTopFilters } from "@/utils/topFiltersQuery";
import { dataGateway } from "@/lib/dataGateway";

export function TopFilters() {
    const { setFilter, filters, doctorOptions, setDoctorOptions } = useFilters();
    const { mode, setMode, isReady } = useMode();
    const pathname = usePathname();
    const isNosologyDetailsPage = pathname.startsWith("/nosologies/") && pathname !== "/nosologies";

    const getSingleValue = (value: string | string[] | undefined) => (Array.isArray(value) ? "all" : (value || "all"));

    useEffect(() => {
        if (isNosologyDetailsPage) {
            return;
        }

        let isCancelled = false;

        async function loadDoctorOptions() {
            try {
                const filtersWithoutDoctor = { ...filters, doctor: [] };
                const doctors = await dataGateway.getDoctors(buildUrlWithTopFilters("/api/doctors", filtersWithoutDoctor));
                const selectedSpecialties = Array.isArray(filters.specialty)
                    ? new Set(filters.specialty.map((item) => item.toLowerCase()))
                    : null;

                const filteredDoctors = selectedSpecialties && selectedSpecialties.size > 0
                    ? doctors.filter((doctor) => selectedSpecialties.has(doctor.profession.toLowerCase()))
                    : doctors;

                if (!isCancelled) {
                    setDoctorOptions(buildDoctorFilterOptions(filteredDoctors, (doctor) => doctor.fullName));
                }
            } catch (error) {
                console.error("[TopFilters] Не удалось загрузить список врачей", error);

                if (!isCancelled) {
                    setDoctorOptions([]);
                }
            }
        }

        void loadDoctorOptions();

        return () => {
            isCancelled = true;
        };
    }, [filters, isNosologyDetailsPage, setDoctorOptions]);

    if (!isReady) return <div className="h-20 bg-gray-100 dark:bg-gray-900" />;

    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex flex-wrap items-start justify-between gap-x-6 gap-y-3 px-6 py-3 shadow-sm">
            <div className="flex min-w-0 flex-1 flex-wrap items-start gap-x-4 gap-y-3">
                <CalendarPopover />

                <FilterSelect
                    label="Специальность"
                    values={Array.isArray(filters.specialty) ? filters.specialty : []}
                    onMultiChange={(values) => setFilter("specialty", values)}
                    multiple
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
                    value={getSingleValue(filters.type)}
                    options={[
                        { value: "all", label: "Все" },
                        { value: "first", label: "Первичный" },
                        { value: "second", label: "Повторный" },
                    ]}
                    onChange={(v) => setFilter("type", v)}
                />

                <FilterSelect
                    label="Филиал"
                    values={Array.isArray(filters.branch) ? filters.branch : []}
                    onMultiChange={(values) => setFilter("branch", values)}
                    multiple
                    options={[
                        { value: "all", label: "Все филиалы" },
                        { value: "Филиал 1", label: "Филиал 1" },
                        { value: "Филиал 2", label: "Филиал 2" },
                        { value: "Филиал 3", label: "Филиал 3" },
                    ]}
                />

                <FilterSelect
                    label="Врач"
                    values={Array.isArray(filters.doctor) ? filters.doctor : []}
                    onMultiChange={(values) => setFilter("doctor", values)}
                    multiple
                    options={doctorOptions}
                />

                <FilterSelect
                    label="Стаховые"
                    value={getSingleValue(filters.insurance)}
                    onChange={(v) => setFilter("insurance", v)}
                    options={[
                        { value: "all", label: "Все" },
                        { value: "insurance", label: "По страховым" },
                        { value: "self", label: "За свой счёт" },
                    ]}
                />

                <FilterSelect
                    label="Вид услуг"
                    value={getSingleValue(filters.serviceType)}
                    onChange={(v) => setFilter("serviceType", v)}
                    options={[
                        { value: "all", label: "Все" },
                        { value: "required", label: "Обязательные" },
                        { value: "indicated", label: "По показаниям" },
                    ]}
                />

                <FilterSelect
                    label="EasyMed"
                    value={getSingleValue(filters.easyMed)}
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
