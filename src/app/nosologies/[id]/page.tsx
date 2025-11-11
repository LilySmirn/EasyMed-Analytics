'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NosologyDoctorsTable, NosologyDoctor } from "@/components/NosologyDoctorsTable";
import { BackButton } from "@/components/BackButton";

export default function NosologyPage({ params }: { params: { id: string } }) {
    const [doctors, setDoctors] = useState<NosologyDoctor[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "Нозология";

    useEffect(() => {
        fetch(`/api/nosologies/${params.id}/doctors`)
            .then((res) => res.json())
            .then((data) => setDoctors(data))
            .finally(() => setLoading(false));
    }, [params.id]);

    if (loading) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">{name}</h1>
            </div>
            <NosologyDoctorsTable data={doctors} nosologyId={params.id} />
        </div>
    );
}
