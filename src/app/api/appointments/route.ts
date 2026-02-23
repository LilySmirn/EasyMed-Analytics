import { NextResponse } from "next/server";

const appointments = [
    {
        id: "a1",
        doctorId: "1",
        date: "2025-10-10",
        number: "001",
        requiredServices: 4,
        assignedRequired: 4,
        assignmentPercent: 100,
        completionPercent: 100,
        deviationPercent: 0,
        revenue: "2 900 ₽",
        lostRevenue: "0 ₽",
    },
    {
        id: "a2",
        doctorId: "1",
        date: "2025-10-11",
        number: "002",
        requiredServices: 5,
        assignedRequired: 4,
        assignmentPercent: 80,
        completionPercent: 75,
        deviationPercent: 20,
        revenue: "2 500 ₽",
        lostRevenue: "650 ₽",
    },
    {
        id: "a3",
        doctorId: "2",
        date: "2025-10-12",
        number: "003",
        requiredServices: 6,
        assignedRequired: 6,
        assignmentPercent: 100,
        completionPercent: 83,
        deviationPercent: 0,
        revenue: "3 600 ₽",
        lostRevenue: "400 ₽",
    },
    {
        id: "a4",
        doctorId: "2",
        date: "2025-10-13",
        number: "004",
        requiredServices: 5,
        assignedRequired: 4,
        assignmentPercent: 80,
        completionPercent: 80,
        deviationPercent: 20,
        revenue: "3 150 ₽",
        lostRevenue: "520 ₽",
    },
    {
        id: "a5",
        doctorId: "4",
        date: "2025-10-14",
        number: "005",
        requiredServices: 4,
        assignedRequired: 3,
        assignmentPercent: 75,
        completionPercent: 67,
        deviationPercent: 25,
        revenue: "2 950 ₽",
        lostRevenue: "700 ₽",
    },
    {
        id: "a6",
        doctorId: "5",
        date: "2025-10-15",
        number: "006",
        requiredServices: 6,
        assignedRequired: 5,
        assignmentPercent: 83,
        completionPercent: 80,
        deviationPercent: 17,
        revenue: "3 400 ₽",
        lostRevenue: "580 ₽",
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
