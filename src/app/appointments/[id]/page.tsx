'use client';

import { useEffect, useState } from "react";
import { AppointmentDetailsTable, AppointmentDetail } from "@/components/AppointmentDetailsTable";
import { BackButton } from "@/components/BackButton";
import { InlineDrawerItem, useInlineDrawer } from "@/context/InlineDrawerContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Doctor } from "@/components/DoctorsTable/DoctorsTable";

interface AppointmentDetailsPageProps {
    params: { id: string };
}

type AppointmentSummary = { id: string; date?: string; number?: string; mkb?: string };

const getDiagnosisByMkb = (mkbCode: string) => {
    if (mkbCode.startsWith("I21") || mkbCode.startsWith("I22") || mkbCode.startsWith("I24")) {
        return "Ишемическая болезнь сердца";
    }

    return null;
};

const buildAppointmentLabel = (appointment: AppointmentSummary | undefined) => {
    if (appointment?.mkb) {
        const diagnosis = getDiagnosisByMkb(appointment.mkb);
        return `${appointment.mkb}${diagnosis ? ` ${diagnosis}` : ""}`;
    }

    if (appointment?.date && appointment?.number) {
        return `${appointment.date} / ${appointment.number}`;
    }

    return null;
};

export default function AppointmentDetailsPage({ params }: AppointmentDetailsPageProps) {
    const [data, setData] = useState<AppointmentDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [doctorId, setDoctorId] = useState<string | null>(null);
    const [appointmentLabel, setAppointmentLabel] = useState<string | null>(null);

    const { setItems, setCurrentId } = useInlineDrawer();
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryDoctorId = searchParams.get("id");
    const nosologyId = searchParams.get("nosology");
    const specialty = searchParams.get("specialty");

    useEffect(() => {
        if (!params.id) return;

        fetch(`/api/appointments/${params.id}`)
            .then((res) => res.json())
            .then((d) => setData(d))
            .finally(() => setLoading(false));
    }, [params.id]);

    useEffect(() => {
        setCurrentId(params.id);
    }, [params.id, setCurrentId]);

    useEffect(() => {
        if (queryDoctorId) {
            setDoctorId(queryDoctorId);
            return;
        }

        const resolveDoctorId = async () => {
            const doctorsRes = await fetch("/api/doctors");
            const doctors: Doctor[] = await doctorsRes.json();

            const appointmentsByDoctor = await Promise.all(
                doctors.map(async (doctor) => {
                    const appointmentsRes = await fetch(`/api/appointments?doctorId=${doctor.id}`);
                    const appointments: AppointmentSummary[] = await appointmentsRes.json();
                    return { doctorId: doctor.id, appointments };
                }),
            );

            const matchedDoctor = appointmentsByDoctor.find(({ appointments }) =>
                appointments.some((appointment) => appointment.id === params.id),
            );

            setDoctorId(matchedDoctor?.doctorId ?? null);
        };

        resolveDoctorId();
    }, [params.id, queryDoctorId]);

    useEffect(() => {
        if (!doctorId) return;

        if (!queryDoctorId) {
            const query = new URLSearchParams({ id: doctorId });
            if (nosologyId) query.set("nosology", nosologyId);
            if (specialty) query.set("specialty", specialty);
            router.replace(`/appointments/${params.id}?${query.toString()}`);
        }

        fetch(`/api/appointments?doctorId=${doctorId}`)
            .then((res) => res.json())
            .then((appointments: AppointmentSummary[]) => {
                const currentAppointment = appointments.find((a) => a.id === params.id);
                setAppointmentLabel(buildAppointmentLabel(currentAppointment));

                const drawerItems: InlineDrawerItem[] = appointments.map((a) => ({
                    id: a.id,
                    name: a.date || `Приём ${a.number || a.id}`,
                    url: {
                        pathname: `/appointments/${a.id}`,
                        query: {
                            id: doctorId,
                            ...(nosologyId ? { nosology: nosologyId } : {}),
                            ...(specialty ? { specialty } : {}),
                        },
                    },
                }));

                setItems(drawerItems);
            });
    }, [doctorId, nosologyId, params.id, queryDoctorId, router, setItems, specialty]);

    if (!params.id) return <div className="px-4 py-6 sm:px-6 lg:px-4">Не указан ID приёма</div>;
    if (loading) return <div className="px-4 py-6 sm:px-6 lg:px-4">Загрузка...</div>;

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-4">
            <div className="flex items-center gap-2 mb-6">
                <BackButton />
                <h1 className="text-2xl font-bold">{appointmentLabel ?? `Приём №${params.id}`}</h1>
            </div>
            <AppointmentDetailsTable data={data} />
        </div>
    );
}
