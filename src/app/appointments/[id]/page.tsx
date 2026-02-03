'use client';

import { useEffect, useState } from "react";
import { AppointmentDetailsTable, AppointmentDetail } from "@/components/AppointmentDetailsTable";
import {BackButton} from "@/components/BackButton";
import { useInlineDrawer } from "@/context/InlineDrawerContext";

interface AppointmentDetailsPageProps {
    params: { id: string };
}

export default function AppointmentDetailsPage({ params }: AppointmentDetailsPageProps) {
    const [data, setData] = useState<AppointmentDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [doctorId, setDoctorId] = useState<string | null>(null);

    const { setItems } = useInlineDrawer();

    // Загружаем детали приёма
    useEffect(() => {
        if (!params.id) return;

        fetch(`/api/appointments/${params.id}`)
            .then(res => res.json())
            .then(d => {
                setData(d);

                // Берём doctorId из деталей (можно заменить на хранение в state / query)
                // Так как у нас в тестовых данных нет doctorId, можно передать через query
                // Для теста ставим doctorId = "1" для a1/a2, "2" для a3
                let currentDoctorId = "1";
                if (params.id === "a3") currentDoctorId = "2";
                setDoctorId(currentDoctorId);
            })
            .finally(() => setLoading(false));
    }, [params.id]);

    // Загружаем все приёмы этого доктора для боковой панели
    useEffect(() => {
        if (!doctorId) return;

        fetch(`/api/appointments?doctorId=${doctorId}`)
            .then(res => res.json())
            .then((appointments: any[]) => {
                const drawerItems = appointments.map(a => ({
                    id: a.id,
                    name: a.date || `Приём ${a.number || a.id}`, // теперь берём date из списка приёмов
                    url: `/appointments/${a.id}`
                }));
                setItems(drawerItems);
            });
    }, [doctorId, setItems]);

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
