'use client';

import { useEffect, useState, useMemo } from 'react';
import { DoctorsTable, Doctor } from "@/components/DoctorsTable";
import { useFilters } from "@/context/FiltersContext";
import { applyFilters, FilterValue } from "@/utils/applyFilters";

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const { filters } = useFilters();

    useEffect(() => {
        fetch('/api/doctors')
            .then(res => res.json())
            .then((data: Doctor[]) => setDoctors(data))
            .finally(() => setLoading(false));
    }, []);

    const filteredDoctors = useMemo(
        () => applyFilters<Doctor>(doctors, filters, {
            specialty: { field: "profession" },
            type: {
                custom: (item: Doctor, value: FilterValue) => {
                    if (value === "first") return item.primary > 0;
                    if (value === "second") return item.appointments - item.primary > 0;
                    return true;
                }
            }
        }),
        [doctors, filters]
    );

    if (loading) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Доктора</h1>
            <DoctorsTable data={filteredDoctors} />
        </div>
    );
}
