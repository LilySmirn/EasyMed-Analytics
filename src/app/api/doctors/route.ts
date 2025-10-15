import { NextResponse } from "next/server";

const doctors = [
    {
        id: "1",
        fullName: "Иванов И.И.",
        appointments: 120,
        primary: 45,
        requiredKR: 30,
        deviations: 5,
        totalServices: 400,
        avgServicesPerVisit: 3.3,
        noServices: "8% (10)",
        avgBill: "2 300 ₽",
        revenue: "276 000 ₽",
        servicesPerVisit: 3.3,
    },
    {
        id: "2",
        fullName: "Петров П.П.",
        appointments: 95,
        primary: 30,
        requiredKR: 28,
        deviations: 3,
        totalServices: 310,
        avgServicesPerVisit: 3.2,
        noServices: "5% (5)",
        avgBill: "2 600 ₽",
        revenue: "247 000 ₽",
        servicesPerVisit: 3.2,
    },
];

export async function GET() {
    return NextResponse.json(doctors);
}
