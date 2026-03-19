'use client';

import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { NosologiesTable, Nosology } from "@/components/NosologiesTable/NosologiesTable";
import { useInlineDrawer } from "@/context/InlineDrawerContext";
import { Doctor } from "@/components/DoctorsTable/DoctorsTable";
import { useFilters } from "@/context/FiltersContext";
import { buildDoctorFilterOptions } from "@/utils/doctorFilterOptions";

export default function NosologiesPage() {
    const [nosologies, setNosologies] = useState<Nosology[]>([]);
    const [loading, setLoading] = useState(true);
    const { setItems, setCurrentId } = useInlineDrawer();
    const { setDoctorOptions } = useFilters();

    useEffect(() => {
        Promise.all([fetch('/api/nosologies'), fetch('/api/doctors')])
            .then(async ([nosologiesRes, doctorsRes]) => {
                const nosologiesData: Nosology[] = await nosologiesRes.json();
                const doctorsData: Doctor[] = await doctorsRes.json();

                setNosologies(nosologiesData);
                setDoctorOptions(buildDoctorFilterOptions(doctorsData, (doctor) => doctor.fullName));
            })
            .finally(() => setLoading(false));

        setItems([]);
        setCurrentId(null);
    }, [setCurrentId, setDoctorOptions, setItems]);

    if (loading) return <div className="px-4 py-6 sm:px-6 lg:px-4">Загрузка...</div>;

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-4">
            <div className="flex items-center gap-2 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">Нозологии</h1>
            </div>
            <NosologiesTable data={nosologies} />
        </div>
    );
}
