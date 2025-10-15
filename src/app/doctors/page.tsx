import { DoctorsTable } from "@/components/DoctorsTable";

async function getDoctors() {
    const res = await fetch("http://localhost:3000/api/doctors", {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch doctors");
    return res.json();
}

export default async function DoctorsPage() {
    const doctors = await getDoctors();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Доктора</h1>
            <DoctorsTable data={doctors} />
        </div>
    );
}
