import { NextResponse } from "next/server";

export async function GET() {
    const nosologies = [
        {
            id: "1",
            name: "ОРВИ",
            diagnosesCount: 120,
            noServicesVisits: 15,
            requiredServices: 320,
            appointmentRate: "85%",
            completionRate: "78%",
            deviationRate: "12%",
            revenue: "1 250 000 ₽",
            lostRevenue: "150 000 ₽",
            avgAssignRate: "3.5",
        },
        {
            id: "2",
            name: "Бронхит",
            diagnosesCount: 90,
            noServicesVisits: 10,
            requiredServices: 280,
            appointmentRate: "90%",
            completionRate: "80%",
            deviationRate: "8%",
            revenue: "980 000 ₽",
            lostRevenue: "95 000 ₽",
            avgAssignRate: "3.1",
        },
        {
            id: "3",
            name: "Пневмония",
            diagnosesCount: 60,
            noServicesVisits: 6,
            requiredServices: 210,
            appointmentRate: "88%",
            completionRate: "82%",
            deviationRate: "7%",
            revenue: "1 150 000 ₽",
            lostRevenue: "130 000 ₽",
            avgAssignRate: "3.4",
        },
        {
            id: "4",
            name: "Отит",
            diagnosesCount: 45,
            noServicesVisits: 5,
            requiredServices: 140,
            appointmentRate: "92%",
            completionRate: "85%",
            deviationRate: "5%",
            revenue: "780 000 ₽",
            lostRevenue: "70 000 ₽",
            avgAssignRate: "3.2",
        },
    ];

    return NextResponse.json(nosologies);
}
