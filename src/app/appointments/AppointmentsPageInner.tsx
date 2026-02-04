'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppointmentsTable, Appointment } from '@/components/AppointmentsTable';
import { BackButton } from "@/components/BackButton";
import { useInlineDrawer } from "@/context/InlineDrawerContext";
import { useFilters } from "@/context/FiltersContext";

export default function AppointmentsPageInner() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('id');

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    const { setItems } = useInlineDrawer();
    const { filters } = useFilters();

    // Загружаем все приёмы конкретного доктора с учётом фильтров
    useEffect(() => {
        if (!doctorId) return;

        setLoading(true);

        let url = `/api/appointments?doctorId=${doctorId}`;

        // Добавляем фильтры в запрос, если нужно
        Object.entries(filters).forEach(([key, value]) => {
            url += `&${key}=${encodeURIComponent(value)}`;
        });

        fetch(url)
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .finally(() => setLoading(false));
    }, [doctorId, filters]); // <-- фильтры в зависимостях

    // Загружаем всех докторов для боковой панели с учётом фильтров
    useEffect(() => {
        fetch('/api/doctors')
            .then(res => res.json())
            .then((data) => {
                // фильтруем только для бокового меню
                const drawerFiltered = data.filter((doc: any) => {
                    // проверяем, есть ли фильтры, которые применимы к докторам
                    if (filters.city && doc.city !== filters.city) return false;
                    if (filters.department && doc.department !== filters.department) return false;
                    return true;
                });

                const drawerItems = drawerFiltered.map((doc: any) => ({
                    id: doc.id,
                    name: doc.fullName,
                    url: `/appointments?id=${doc.id}`,
                }));

                setItems(drawerItems);
            });
    }, [filters, setItems]); // <-- реагирует только на filters

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
