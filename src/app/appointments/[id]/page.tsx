'use client';

import { useEffect, useState } from "react";
import { AppointmentDetailsTable, AppointmentDetail } from "@/components/AppointmentDetailsTable";
import {BackButton} from "@/components/BackButton";

interface AppointmentDetailsPageProps {
    params: { id: string };
}

export default function AppointmentDetailsPage({ params }: AppointmentDetailsPageProps) {
    const [data, setData] = useState<AppointmentDetail[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!params.id) return;

        fetch(`/api/appointments/${params.id}`)
            .then(res => res.json())
            .then(d => setData(d))
            .finally(() => setLoading(false));
    }, [params.id]);

    if (!params.id) return <div className="p-8">Не указан ID приёма</div>;
    if (loading) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">Детали приёма №{params.id}</h1>
            </div>
            <AppointmentDetailsTable data={data} />
        </div>
    );
}
