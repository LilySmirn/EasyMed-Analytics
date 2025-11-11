import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    // Тестовые данные
    const doctorsByNosology: Record<string, any[]> = {
        "1": [
            {
                id: 1,
                name: "Иванов Иван Иванович",
                diagnosesCount: 25,
                requiredServices: 12,
                assignPercent: 85,
                completionPercent: 90,
                deviationPercent: 5,
                revenue: "350 000 ₽",
                lostRevenue: "20 000 ₽",
                avgAssign: 3.2,
            },
            {
                id: 2,
                name: "Петров Пётр Петрович",
                diagnosesCount: 18,
                requiredServices: 10,
                assignPercent: 80,
                completionPercent: 88,
                deviationPercent: 6,
                revenue: "290 000 ₽",
                lostRevenue: "15 000 ₽",
                avgAssign: 2.9,
            },
        ],
        "2": [
            {
                id: 3,
                name: "Сидорова Анна Викторовна",
                diagnosesCount: 30,
                requiredServices: 14,
                assignPercent: 89,
                completionPercent: 91,
                deviationPercent: 4,
                revenue: "410 000 ₽",
                lostRevenue: "25 000 ₽",
                avgAssign: 3.5,
            },
        ],
    };

    const doctors = doctorsByNosology[id] || [];
    return NextResponse.json(doctors);
}
