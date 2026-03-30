'use client';

import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { NosologiesTable, Nosology } from "@/components/NosologiesTable/NosologiesTable";
import { useInlineDrawer } from "@/context/InlineDrawerContext";
import { useFilters } from "@/context/FiltersContext";
import { buildUrlWithTopFilters } from "@/utils/topFiltersQuery";

export default function NosologiesPage() {
    const [nosologies, setNosologies] = useState<Nosology[]>([]);
    const [loading, setLoading] = useState(true);
    const { setItems, setCurrentId } = useInlineDrawer();
    const { filters } = useFilters();

    useEffect(() => {
        fetch(buildUrlWithTopFilters('/api/nosologies', filters))
            .then(async (nosologiesRes) => {
                const nosologiesData: Nosology[] = await nosologiesRes.json();

                setNosologies(nosologiesData);
            })
            .finally(() => setLoading(false));

        setItems([]);
        setCurrentId(null);
    }, [filters, setCurrentId, setItems]);

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
