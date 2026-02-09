'use client';

import { useEffect, useState } from "react";
import { AppointmentDetailsTable, AppointmentDetail } from "@/components/AppointmentDetailsTable";
import { BackButton } from "@/components/BackButton";
import { InlineDrawerItem, useInlineDrawer } from "@/context/InlineDrawerContext";
import { useSearchParams } from "next/navigation";
import { Doctor } from "@/components/DoctorsTable/DoctorsTable";

interface AppointmentDetailsPageProps {
    params: { id: string };
}

export default function AppointmentDetailsPage({ params }: AppointmentDetailsPageProps) {
    const [data, setData] = useState<AppointmentDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [doctorId, setDoctorId] = useState<string | null>(null);

    const { setItems, setCurrentId } = useInlineDrawer();
    const searchParams = useSearchParams();
    const nosologyId = searchParams.get("nosology");

    useEffect(() => {
        if (!params.id) return;

        fetch(`/api/appointments/${params.id}`)
            .then(res => res.json())
            .then(d => setData(d))
            .finally(() => setLoading(false));
    }, [params.id]);

    useEffect(() => {
        setCurrentId(params.id);
    }, [params.id, setCurrentId]);

    useEffect(() => {
        const resolveDoctorId = async () => {
            const doctorsRes = await fetch('/api/doctors');
            const doctors: Doctor[] = await doctorsRes.json();

            for (const doctor of doctors) {
                const appointmentsRes = await fetch(`/api/appointments?doctorId=${doctor.id}`);
                const appointments = await appointmentsRes.json();
                if (appointments.some((appointment: { id: string }) => appointment.id === params.id)) {
                    setDoctorId(doctor.id);
                    return;
                }
            }

            setDoctorId(null);
        };

        resolveDoctorId();
    }, [params.id]);

    useEffect(() => {
        if (!doctorId) return;

        fetch(`/api/appointments?doctorId=${doctorId}`)
            .then(res => res.json())
            .then((appointments: Array<{ id: string; date?: string; number?: string }>) => {
                const drawerItems: InlineDrawerItem[] = appointments.map((a) => ({
                    id: a.id,
                    name: a.date || `Приём ${a.number || a.id}`,
                    url: {
                        pathname: `/appointments/${a.id}`,
                        query: nosologyId ? { nosology: nosologyId } : undefined,
                    },
                }));

                setItems(drawerItems);
            });
    }, [doctorId, nosologyId, setItems]);

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
