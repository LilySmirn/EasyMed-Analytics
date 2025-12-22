"use client";

import { useEffect, useState, useMemo } from "react";
import { DoctorsTable, Doctor } from "@/components/DoctorsTable/DoctorsTable";
import { useFilters } from "@/context/FiltersContext";
import { applyFilters, FilterValue } from "@/utils/applyFilters";
import { BackButton } from "@/components/BackButton";

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    // Тумблер: true = Финансы, false = Качество лечения
    const [showFinance, setShowFinance] = useState(false);

    const { filters } = useFilters();

    useEffect(() => {
        fetch("/api/doctors")
            .then((res) => res.json())
            .then((data: Doctor[]) => setDoctors(data))
            .finally(() => setLoading(false));
    }, []);

    const filteredDoctors = useMemo(
        () =>
            applyFilters<Doctor>(doctors, filters, {
                specialty: { field: "profession" },
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

    if (loading) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">Доктора</h1>
            </div>

            {/* Тумблер КЛ / ФП */}
            <div className="flex gap-2 mb-4">
                <button
                    className={`px-4 py-2 rounded ${
                        !showFinance ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setShowFinance(false)}
                >
                    Качество лечения
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        showFinance ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setShowFinance(true)}
                >
                    Финансы
                </button>
            </div>

            <DoctorsTable data={filteredDoctors} useFinance={showFinance} />
        </div>
    );
}
