import { NextResponse } from "next/server";

interface Nosology {
    id: string;
    name: string;
    diagnosesCount: number;
    noServices: number;
    requiredServices: number;
    assignPercent: number;
    completionPercent: number;
    deviationPercent: number;
    revenue: string;
    lostRevenue: string;
    avgAssign: number;
}

export async function GET() {
    const nosologies: Nosology[] = [
        {
            id: "1",
            name: "ОРВИ",
            diagnosesCount: 120,
            noServices: 15,
            requiredServices: 320,
            assignPercent: 85,
            completionPercent: 78,
            deviationPercent: 12,
            revenue: "1 250 000 ₽",
            lostRevenue: "150 000 ₽",
            avgAssign: 3.5,
        },
        {
            id: "2",
            name: "Бронхит",
            diagnosesCount: 90,
            noServices: 10,
            requiredServices: 280,
            assignPercent: 90,
            completionPercent: 80,
            deviationPercent: 8,
            revenue: "980 000 ₽",
            lostRevenue: "95 000 ₽",
            avgAssign: 3.1,
        },
        {
            id: "3",
            name: "Пневмония",
            diagnosesCount: 60,
            noServices: 6,
            requiredServices: 210,
            assignPercent: 88,
            completionPercent: 82,
            deviationPercent: 7,
            revenue: "1 150 000 ₽",
            lostRevenue: "130 000 ₽",
            avgAssign: 3.4,
        },
        {
            id: "4",
            name: "Отит",
            diagnosesCount: 45,
            noServices: 5,
            requiredServices: 140,
            assignPercent: 92,
            completionPercent: 85,
            deviationPercent: 5,
            revenue: "780 000 ₽",
            lostRevenue: "70 000 ₽",
            avgAssign: 3.2,
        },
    ];

    return NextResponse.json(nosologies);
}
