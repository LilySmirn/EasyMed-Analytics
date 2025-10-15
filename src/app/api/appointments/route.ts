import { NextResponse } from "next/server";

const appointments = [
    {
        id: "a1",
        doctorId: "1",
        date: "2025-10-10",
        number: "001",
        requiredServices: 5,
        assignedRequired: 4,
        assignmentPercent: 80,
        completionPercent: 90,
        deviationPercent: 10,
        revenue: "2 500 ₽",
        lostRevenue: "300 ₽",
    },
    {
        id: "a2",
        doctorId: "1",
        date: "2025-10-11",
        number: "002",
        requiredServices: 6,
        assignedRequired: 5,
        assignmentPercent: 83,
        completionPercent: 95,
        deviationPercent: 5,
        revenue: "2 800 ₽",
        lostRevenue: "150 ₽",
    },
    {
        id: "a3",
        doctorId: "2",
        date: "2025-10-12",
        number: "003",
        requiredServices: 4,
        assignedRequired: 2,
        assignmentPercent: 50,
        completionPercent: 70,
        deviationPercent: 20,
        revenue: "1 900 ₽",
        lostRevenue: "600 ₽",
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");

    if (!doctorId) {
        return NextResponse.json(
            { error: "Missing doctorId parameter" },
            { status: 400 }
        );
    }

    const doctorAppointments = appointments.filter(
        (a) => a.doctorId === doctorId
    );

    return NextResponse.json(doctorAppointments);
}
