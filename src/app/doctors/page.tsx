'use client';

import { useEffect, useMemo, useState } from "react";
import { DoctorsTable, Doctor } from "@/components/DoctorsTable/DoctorsTable";
import { useFilters } from "@/context/FiltersContext";
import { applyFilters, FilterValue } from "@/utils/applyFilters";
import { BackButton } from "@/components/BackButton";
import { dataGateway } from "@/lib/dataGateway";
import { useInlineDrawer } from "@/context/InlineDrawerContext";
import {
    buildTopFiltersPayload,
    buildUrlWithTopFilters,
} from "@/utils/topFiltersRequest";

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    const { filters, dateRange } = useFilters();
    const { setItems, setCurrentId } = useInlineDrawer();

    useEffect(() => {
        let cancelled = false;

        async function loadDoctors() {
            setLoading(true);

            const payload = buildTopFiltersPayload(filters, { dateRange });
            const url = buildUrlWithTopFilters("/api/doctors", filters, { dateRange });

            console.group("[DoctorsPage] request");
            console.log("filters:", filters);
            console.log("dateRange:", dateRange);
            console.log("payload:", payload);
            console.log("url:", url);
            console.groupEnd();

            try {
                const data = await dataGateway.getDoctors(url);

                if (cancelled) return;

                setDoctors(data);
            } catch (error) {
                if (!cancelled) {
                    console.error("[DoctorsPage] Не удалось загрузить докторов", error);
                    setDoctors([]);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void loadDoctors();

        return () => {
            cancelled = true;
        };
    }, [filters, dateRange]);

    useEffect(() => {
        setItems([]);
        setCurrentId(null);
    }, [setCurrentId, setItems]);

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
