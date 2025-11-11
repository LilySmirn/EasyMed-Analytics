import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    // Тестовые данные нозологий
    const doctorsByNosology: Record<string, any[]> = {
        "1": [ // Например: "Грипп"
            {
                id: "1",
                name: "Иванов И.И.",
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
                id: "3",
                name: "Сидорова А.А.",
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
        "2": [ // Например: "Диабет"
            {
                id: "4",
                name: "Кузнецов Д.В.",
                diagnosesCount: 30,
                requiredServices: 14,
                assignPercent: 89,
                completionPercent: 91,
                deviationPercent: 4,
                revenue: "410 000 ₽",
                lostRevenue: "25 000 ₽",
                avgAssign: 3.5,
            },
            {
                id: "6",
                name: "Фёдоров С.А.",
                diagnosesCount: 22,
                requiredServices: 11,
                assignPercent: 86,
                completionPercent: 90,
                deviationPercent: 5,
                revenue: "330 000 ₽",
                lostRevenue: "19 000 ₽",
                avgAssign: 3.1,
            },
        ],
        "3": [ // Например: "Гипертония"
            {
                id: "2",
                name: "Петров П.П.",
                diagnosesCount: 20,
                requiredServices: 9,
                assignPercent: 83,
                completionPercent: 89,
                deviationPercent: 7,
                revenue: "295 000 ₽",
                lostRevenue: "18 000 ₽",
                avgAssign: 3.0,
            },
            {
                id: "5",
                name: "Морозова Е.Н.",
                diagnosesCount: 16,
                requiredServices: 8,
                assignPercent: 82,
                completionPercent: 87,
                deviationPercent: 8,
                revenue: "280 000 ₽",
                lostRevenue: "21 000 ₽",
                avgAssign: 2.8,
            },
        ],
    };

    const doctors = doctorsByNosology[id] || [];
    return NextResponse.json(doctors);
}
