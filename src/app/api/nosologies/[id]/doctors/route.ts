import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    type NosologyDoctor = {
        id: string;
        name: string;
        diagnosesCount: number;
        requiredServices: number;
        assignPercent: number;
        completionPercent: number;
        deviationPercent: number;
        revenue: string;
        lostRevenue: string;
        avgAssign: number;
    };

    const doctorsByNosology: Record<string, NosologyDoctor[]> = {
        "1": [
            {
                id: "1",
                name: "Иванов И.И.",
                diagnosesCount: 62,
                requiredServices: 19,
                assignPercent: 91,
                completionPercent: 86,
                deviationPercent: 7,
                revenue: "167 400 ₽",
                lostRevenue: "9 600 ₽",
                avgAssign: 3.1,
            },
            {
                id: "3",
                name: "Сидорова А.А.",
                diagnosesCount: 74,
                requiredServices: 22,
                assignPercent: 93,
                completionPercent: 88,
                deviationPercent: 6,
                revenue: "214 600 ₽",
                lostRevenue: "10 400 ₽",
                avgAssign: 3.2,
            },
            {
                id: "8",
                name: "Григорьев Л.Т.",
                diagnosesCount: 49,
                requiredServices: 15,
                assignPercent: 92,
                completionPercent: 87,
                deviationPercent: 6,
                revenue: "132 300 ₽",
                lostRevenue: "8 200 ₽",
                avgAssign: 3,
            },
        ],
        "2": [
            {
                id: "2",
                name: "Петров П.П.",
                diagnosesCount: 58,
                requiredServices: 18,
                assignPercent: 96,
                completionPercent: 90,
                deviationPercent: 4,
                revenue: "191 100 ₽",
                lostRevenue: "7 900 ₽",
                avgAssign: 3.3,
            },
            {
                id: "5",
                name: "Морозова Е.Н.",
                diagnosesCount: 79,
                requiredServices: 24,
                assignPercent: 94,
                completionPercent: 88,
                deviationPercent: 5,
                revenue: "257 400 ₽",
                lostRevenue: "11 600 ₽",
                avgAssign: 3.4,
            },
            {
                id: "10",
                name: "Николаев Р.И.",
                diagnosesCount: 67,
                requiredServices: 20,
                assignPercent: 93,
                completionPercent: 87,
                deviationPercent: 6,
                revenue: "214 500 ₽",
                lostRevenue: "8 500 ₽",
                avgAssign: 3.2,
            },
        ],
        "3": [
            {
                id: "4",
                name: "Кузнецов Д.В.",
                diagnosesCount: 56,
                requiredServices: 17,
                assignPercent: 92,
                completionPercent: 84,
                deviationPercent: 8,
                revenue: "173 600 ₽",
                lostRevenue: "9 400 ₽",
                avgAssign: 3.1,
            },
            {
                id: "6",
                name: "Фёдоров С.А.",
                diagnosesCount: 70,
                requiredServices: 21,
                assignPercent: 90,
                completionPercent: 83,
                deviationPercent: 9,
                revenue: "210 100 ₽",
                lostRevenue: "12 900 ₽",
                avgAssign: 3.1,
            },
            {
                id: "9",
                name: "Орлова В.С.",
                diagnosesCount: 52,
                requiredServices: 16,
                assignPercent: 91,
                completionPercent: 85,
                deviationPercent: 7,
                revenue: "150 300 ₽",
                lostRevenue: "11 700 ₽",
                avgAssign: 3,
            },
        ],
        "4": [
            {
                id: "2",
                name: "Петров П.П.",
                diagnosesCount: 44,
                requiredServices: 14,
                assignPercent: 95,
                completionPercent: 89,
                deviationPercent: 5,
                revenue: "140 600 ₽",
                lostRevenue: "6 400 ₽",
                avgAssign: 3.2,
            },
            {
                id: "7",
                name: "Васильева М.Г.",
                diagnosesCount: 37,
                requiredServices: 12,
                assignPercent: 96,
                completionPercent: 90,
                deviationPercent: 4,
                revenue: "118 400 ₽",
                lostRevenue: "5 600 ₽",
                avgAssign: 3.2,
            },
            {
                id: "10",
                name: "Николаев Р.И.",
                diagnosesCount: 41,
                requiredServices: 13,
                assignPercent: 94,
                completionPercent: 88,
                deviationPercent: 5,
                revenue: "132 900 ₽",
                lostRevenue: "7 100 ₽",
                avgAssign: 3.2,
            },
        ],
        "5": [
            {
                id: "4",
                name: "Кузнецов Д.В.",
                diagnosesCount: 39,
                requiredServices: 12,
                assignPercent: 91,
                completionPercent: 84,
                deviationPercent: 8,
                revenue: "113 100 ₽",
                lostRevenue: "6 900 ₽",
                avgAssign: 3,
            },
            {
                id: "6",
                name: "Фёдоров С.А.",
                diagnosesCount: 48,
                requiredServices: 15,
                assignPercent: 89,
                completionPercent: 82,
                deviationPercent: 10,
                revenue: "139 200 ₽",
                lostRevenue: "8 800 ₽",
                avgAssign: 3,
            },
            {
                id: "9",
                name: "Орлова В.С.",
                diagnosesCount: 36,
                requiredServices: 10,
                assignPercent: 90,
                completionPercent: 83,
                deviationPercent: 9,
                revenue: "104 700 ₽",
                lostRevenue: "8 300 ₽",
                avgAssign: 2.9,
            },
        ],
    };

    const doctors = doctorsByNosology[id] || [];
    return NextResponse.json(doctors);
}
