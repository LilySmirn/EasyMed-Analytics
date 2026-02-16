'use client';

import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { NosologiesTable, Nosology } from "@/components/NosologiesTable/NosologiesTable";
import { useInlineDrawer } from "@/context/InlineDrawerContext";

export default function NosologiesPage() {
    const [nosologies, setNosologies] = useState<Nosology[]>([]);
    const [loading, setLoading] = useState(true);
    const { setItems, setCurrentId } = useInlineDrawer();

    useEffect(() => {
        fetch('/api/nosologies')
            .then(res => res.json())
            .then((data: Nosology[]) => setNosologies(data))
            .finally(() => setLoading(false));

        setItems([]);
        setCurrentId(null);
    }, [setCurrentId, setItems]);

    if (loading) return <div className="px-4 py-6 sm:px-6 lg:px-8">Загрузка...</div>;

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">Нозологии</h1>
            </div>
            <NosologiesTable data={nosologies} />
        </div>
    );
}
