'use client';

import { useEffect, useState, useMemo } from "react";
import { DoctorsTable, Doctor } from "@/components/DoctorsTable/DoctorsTable";
import { useFilters } from "@/context/FiltersContext";
import { applyFilters, FilterValue } from "@/utils/applyFilters";
import { BackButton } from "@/components/BackButton";
import { useInlineDrawer } from "@/context/InlineDrawerContext";
import { buildDoctorFilterOptions } from "@/utils/doctorFilterOptions";

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    const { filters, setDoctorOptions } = useFilters();
    const { setItems, setCurrentId } = useInlineDrawer();

    useEffect(() => {
        fetch("/api/doctors")
            .then((res) => res.json())
            .then((data: Doctor[]) => {
                setDoctors(data);
                setDoctorOptions(buildDoctorFilterOptions(data, (doctor) => doctor.fullName));
            })
            .finally(() => setLoading(false));

        setItems([]);
        setCurrentId(null);
    }, [setCurrentId, setDoctorOptions, setItems]);

    const filteredDoctors = useMemo(
        () =>
            applyFilters<Doctor>(doctors, filters, {
                specialty: { field: "profession" },
                doctor: { field: "id" },
                type: {
                    custom: (item: Doctor, value: FilterValue) => {
                        if (value === "first") return item.primary > 0;
                        if (value === "second") return item.appointments - item.primary > 0;
                        return true;
                    },
                },
            }),
        [doctors, filters]
    );

    if (loading) return <div className="px-4 py-6 sm:px-6 lg:px-4">Загрузка...</div>;

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <BackButton />
                    <h1 className="text-2xl font-bold">Доктора</h1>
                </div>
            </div>

            <DoctorsTable data={filteredDoctors} />
        </div>
    );
}
