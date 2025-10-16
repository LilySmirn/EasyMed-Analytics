// src/app/doctors/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { DoctorsTable } from "@/components/DoctorsTable";

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Доктора</h1>
            <DoctorsTable data={doctors} />
        </div>
    );
}
