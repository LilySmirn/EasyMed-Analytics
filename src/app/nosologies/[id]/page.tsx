'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NosologyDoctorsTable, NosologyDoctor } from "@/components/NosologyDoctorsTable";
import { BackButton } from "@/components/BackButton";
import { InlineDrawerItem, useInlineDrawer } from "@/context/InlineDrawerContext";
import { Nosology } from "@/components/NosologiesTable/NosologiesTable";

export default function NosologyPage({ params }: { params: { id: string } }) {
    const [doctors, setDoctors] = useState<NosologyDoctor[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "Нозология";

    const { setItems, setCurrentId } = useInlineDrawer();

    useEffect(() => {
        fetch(`/api/nosologies/${params.id}/doctors`)
            .then((res) => res.json())
            .then((data) => setDoctors(data))
            .finally(() => setLoading(false));
    }, [params.id]);

    useEffect(() => {
        setCurrentId(params.id);
    }, [params.id, setCurrentId]);

    useEffect(() => {
        fetch('/api/nosologies')
            .then((res) => res.json())
            .then((data: Nosology[]) => {
                const drawerItems: InlineDrawerItem[] = data.map((nosology) => ({
                    id: nosology.id,
                    name: nosology.name,
                    url: {
                        pathname: `/nosologies/${nosology.id}`,
                        query: { name: nosology.name },
                    },
                }));

                setItems(drawerItems);
            });
    }, [setItems]);

    if (loading) return <div className="px-4 py-6 sm:px-6 lg:px-8">Загрузка...</div>;

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">{name}</h1>
            </div>
            <NosologyDoctorsTable data={doctors} nosologyId={params.id} />
        </div>
    );
}
