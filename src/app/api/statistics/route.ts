import { NextResponse } from "next/server";

const statistics = [
    { id: "1", name: "Грипп", requests: 45, percentOfAppointments: 12 },
    { id: "2", name: "ОРВИ", requests: 30, percentOfAppointments: 8 },
    { id: "3", name: "Пневмония", requests: 20, percentOfAppointments: 5 },
    { id: "4", name: "Гастрит", requests: 25, percentOfAppointments: 7 },
    { id: "5", name: "Астма", requests: 15, percentOfAppointments: 4 },
];

export async function GET() {
    return NextResponse.json(statistics);
}
