import { NextResponse } from "next/server";

type Appointment = {
    id: string;
    doctorId: string;
    date: string;
    number: string;
    requiredServices: number;
    assignedRequired: number;
    assignmentPercent: number;
    completionPercent: number;
    deviationPercent: number;
    revenue: string;
    lostRevenue: string;
};

const appointments: Appointment[] = [
    { id: "a1", doctorId: "1", date: "2025-10-10", number: "001", requiredServices: 4, assignedRequired: 4, assignmentPercent: 100, completionPercent: 100, deviationPercent: 0, revenue: "2 900 ₽", lostRevenue: "0 ₽" },
    { id: "a2", doctorId: "1", date: "2025-10-11", number: "002", requiredServices: 5, assignedRequired: 4, assignmentPercent: 80, completionPercent: 75, deviationPercent: 20, revenue: "2 500 ₽", lostRevenue: "650 ₽" },

    { id: "a3", doctorId: "2", date: "2025-10-12", number: "003", requiredServices: 6, assignedRequired: 6, assignmentPercent: 100, completionPercent: 83, deviationPercent: 0, revenue: "3 600 ₽", lostRevenue: "400 ₽" },
    { id: "a4", doctorId: "2", date: "2025-10-13", number: "004", requiredServices: 5, assignedRequired: 4, assignmentPercent: 80, completionPercent: 80, deviationPercent: 20, revenue: "3 150 ₽", lostRevenue: "520 ₽" },

    { id: "a5", doctorId: "3", date: "2025-10-14", number: "005", requiredServices: 4, assignedRequired: 4, assignmentPercent: 100, completionPercent: 100, deviationPercent: 0, revenue: "2 850 ₽", lostRevenue: "0 ₽" },
    { id: "a6", doctorId: "3", date: "2025-10-15", number: "006", requiredServices: 5, assignedRequired: 4, assignmentPercent: 80, completionPercent: 75, deviationPercent: 20, revenue: "2 700 ₽", lostRevenue: "620 ₽" },

    { id: "a7", doctorId: "4", date: "2025-10-16", number: "007", requiredServices: 4, assignedRequired: 3, assignmentPercent: 75, completionPercent: 67, deviationPercent: 25, revenue: "2 950 ₽", lostRevenue: "700 ₽" },
    { id: "a8", doctorId: "4", date: "2025-10-17", number: "008", requiredServices: 5, assignedRequired: 4, assignmentPercent: 80, completionPercent: 75, deviationPercent: 20, revenue: "3 050 ₽", lostRevenue: "680 ₽" },

    { id: "a9", doctorId: "5", date: "2025-10-18", number: "009", requiredServices: 6, assignedRequired: 5, assignmentPercent: 83, completionPercent: 80, deviationPercent: 17, revenue: "3 400 ₽", lostRevenue: "580 ₽" },
    { id: "a10", doctorId: "5", date: "2025-10-19", number: "010", requiredServices: 5, assignedRequired: 4, assignmentPercent: 80, completionPercent: 75, deviationPercent: 20, revenue: "3 250 ₽", lostRevenue: "640 ₽" },

    { id: "a11", doctorId: "6", date: "2025-10-20", number: "011", requiredServices: 5, assignedRequired: 4, assignmentPercent: 80, completionPercent: 75, deviationPercent: 20, revenue: "2 980 ₽", lostRevenue: "710 ₽" },
    { id: "a12", doctorId: "6", date: "2025-10-21", number: "012", requiredServices: 4, assignedRequired: 3, assignmentPercent: 75, completionPercent: 67, deviationPercent: 25, revenue: "2 840 ₽", lostRevenue: "760 ₽" },

    { id: "a13", doctorId: "7", date: "2025-10-22", number: "013", requiredServices: 5, assignedRequired: 5, assignmentPercent: 100, completionPercent: 80, deviationPercent: 0, revenue: "3 200 ₽", lostRevenue: "410 ₽" },
    { id: "a14", doctorId: "7", date: "2025-10-23", number: "014", requiredServices: 4, assignedRequired: 3, assignmentPercent: 75, completionPercent: 67, deviationPercent: 25, revenue: "2 950 ₽", lostRevenue: "690 ₽" },

    { id: "a15", doctorId: "8", date: "2025-10-24", number: "015", requiredServices: 4, assignedRequired: 4, assignmentPercent: 100, completionPercent: 100, deviationPercent: 0, revenue: "2 650 ₽", lostRevenue: "0 ₽" },
    { id: "a16", doctorId: "8", date: "2025-10-25", number: "016", requiredServices: 5, assignedRequired: 4, assignmentPercent: 80, completionPercent: 75, deviationPercent: 20, revenue: "2 520 ₽", lostRevenue: "600 ₽" },

    { id: "a17", doctorId: "9", date: "2025-10-26", number: "017", requiredServices: 4, assignedRequired: 3, assignmentPercent: 75, completionPercent: 67, deviationPercent: 25, revenue: "2 990 ₽", lostRevenue: "730 ₽" },
    { id: "a18", doctorId: "9", date: "2025-10-27", number: "018", requiredServices: 5, assignedRequired: 4, assignmentPercent: 80, completionPercent: 75, deviationPercent: 20, revenue: "3 040 ₽", lostRevenue: "680 ₽" },

    { id: "a19", doctorId: "10", date: "2025-10-28", number: "019", requiredServices: 6, assignedRequired: 5, assignmentPercent: 83, completionPercent: 80, deviationPercent: 17, revenue: "3 300 ₽", lostRevenue: "590 ₽" },
    { id: "a20", doctorId: "10", date: "2025-10-29", number: "020", requiredServices: 5, assignedRequired: 4, assignmentPercent: 80, completionPercent: 75, deviationPercent: 20, revenue: "3 120 ₽", lostRevenue: "650 ₽" },
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
