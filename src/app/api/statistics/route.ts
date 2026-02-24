import { NextResponse } from "next/server";

const statistics = [
    { id: "1", name: "ОРВИ", requests: 228, percentOfAppointments: 23 },
{ id: "2", name: "Гипертоническая болезнь", requests: 204, percentOfAppointments: 20 },
{ id: "3", name: "Сахарный диабет 2 типа", requests: 178, percentOfAppointments: 18 },
{ id: "4", name: "Хроническая сердечная недостаточность", requests: 156, percentOfAppointments: 15 },
{ id: "5", name: "Гипотиреоз", requests: 126, percentOfAppointments: 13 },
];

export async function GET() {
    return NextResponse.json(statistics);
}
