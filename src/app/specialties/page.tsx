'use client';

import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
import { SpecialtiesTable, Specialty } from "@/components/SpecialtiesTable";

export default function SpecialtiesPage() {
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSpecialties() {
            try {
                const res = await fetch('/api/specialities', { cache: 'no-store' });
                const data: Specialty[] = await res.json();
                setSpecialties(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchSpecialties();
    }, []);

    if (loading) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">Специальности</h1>
            </div>

            <SpecialtiesTable data={specialties} />
        </div>
    );
}
