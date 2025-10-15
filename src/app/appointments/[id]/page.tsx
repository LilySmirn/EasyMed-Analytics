import { AppointmentDetailsTable, AppointmentDetail } from "@/components/AppointmentDetailsTable";

async function getAppointmentDetails(id: string) {
    const res = await fetch(`http://localhost:3000/api/appointments/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Ошибка при загрузке данных");
    return res.json();
}

export default async function AppointmentDetailsPage({ params }: { params: { id: string } }) {
    const data: AppointmentDetail[] = await getAppointmentDetails(params.id);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Детали приёма №{params.id}</h1>
            <AppointmentDetailsTable data={data} />
        </div>
    );
}
