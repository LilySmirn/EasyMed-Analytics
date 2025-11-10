'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppointmentsTable, Appointment } from '@/components/AppointmentsTable';
import {BackButton} from "@/components/BackButton";

export default function AppointmentsPageInner() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('id');

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!doctorId) return;

        fetch(`/api/appointments?doctorId=${doctorId}`)
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .finally(() => setLoading(false));
    }, [doctorId]);

    if (!doctorId) return <div className="p-8">Не указан ID доктора</div>;
    if (loading) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">
                    Приёмы доктора №{doctorId}
                </h1>
            </div>

            <AppointmentsTable data={appointments} />
        </div>
    );
}
