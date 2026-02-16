'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppointmentsTable, Appointment } from '@/components/AppointmentsTable';
import { BackButton } from "@/components/BackButton";
import { InlineDrawerItem, useInlineDrawer } from "@/context/InlineDrawerContext";
import { useFilters } from "@/context/FiltersContext";
import { Doctor } from "@/components/DoctorsTable/DoctorsTable";
import { NosologyDoctor } from "@/components/NosologyDoctorsTable";
import { Specialty } from "@/components/SpecialtiesTable/SpecialtiesTable";
import { applyFilters, FilterValue } from "@/utils/applyFilters";

type DrawerDoctor = Doctor & { city?: string; department?: string };

export default function AppointmentsPageInner() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('id');
    const nosologyId = searchParams.get('nosology');
    const specialtyName = searchParams.get('specialty');

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    const { setItems, setCurrentId } = useInlineDrawer();
    const { filters } = useFilters();

    useEffect(() => {
        if (doctorId) {
            setCurrentId(doctorId);
            return;
        }

        if (specialtyName) {
            setCurrentId(specialtyName);
            return;
        }

        setCurrentId(null);
    }, [doctorId, setCurrentId, specialtyName]);

    useEffect(() => {
        if (!doctorId) return;

        setLoading(true);

        let url = `/api/appointments?doctorId=${doctorId}`;

        Object.entries(filters).forEach(([key, value]) => {
            url += `&${key}=${encodeURIComponent(value)}`;
        });

        fetch(url)
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .finally(() => setLoading(false));
    }, [doctorId, filters]);

    useEffect(() => {
        if (nosologyId) {
            fetch(`/api/nosologies/${nosologyId}/doctors`)
                .then((res) => res.json())
                .then((data: NosologyDoctor[]) => {
                    const drawerItems: InlineDrawerItem[] = data.map((doctor) => ({
                        id: doctor.id,
                        name: doctor.name,
                        url: {
                            pathname: '/appointments',
                            query: {
                                id: doctor.id,
                                nosology: nosologyId,
                            },
                        },
                    }));

                    setItems(drawerItems);
                });

            return;
        }

        if (specialtyName) {
            fetch('/api/specialities')
                .then((res) => res.json())
                .then((data: Specialty[]) => {
                    const drawerItems: InlineDrawerItem[] = data.map((specialty) => ({
                        id: specialty.name,
                        name: specialty.name,
                        url: {
                            pathname: '/appointments',
                            query: { specialty: specialty.name },
                        },
                    }));

                    setItems(drawerItems);
                });

            return;
        }

        fetch('/api/doctors')
            .then(res => res.json())
            .then((data: DrawerDoctor[]) => {
                const drawerFiltered = applyFilters<DrawerDoctor>(data, filters, {
                    specialty: { field: "profession" },
                    type: {
                        custom: (item: DrawerDoctor, value: FilterValue) => {
                            if (value === "first") return item.primary > 0;
                            if (value === "second") return item.appointments - item.primary > 0;
                            return true;
                        },
                    },
                });

                const drawerItems: InlineDrawerItem[] = drawerFiltered.map((doc) => ({
                    id: doc.id,
                    name: doc.fullName,
                    url: `/appointments?id=${doc.id}`,
                }));

                setItems(drawerItems);
            });
    }, [filters, nosologyId, setItems, specialtyName]);

    if (!doctorId) return <div className="px-4 py-6 sm:px-6 lg:px-8">Не указан ID доктора</div>;
    if (loading) return <div className="px-4 py-6 sm:px-6 lg:px-8">Загрузка...</div>;

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
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
