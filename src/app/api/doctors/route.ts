import { NextResponse } from "next/server";
import type { Doctor } from "@/components/DoctorsTable/DoctorsTable";

const doctors: Doctor[] = [
    {
        id: "1",
        fullName: "Иванов И.И.",
        profession: "Терапевт",

        appointments: 120,
        primary: 45,
        repeatAppointments: 75,

        requiredKR: 30,
        krServicesDone: 28,
        deviationPercent: 5,
        totalServices: 50,
        avgServicesPerVisit: 3.3,
        servicesPerVisit: 3.3,
        noServices: "8% (10)",

        assignedOUKRPercent: 93,
        servicesCompletedPercent: 85,
        overKR: 2,

        avgBill: "2 300 ₽",
        revenue: "276 000 ₽",
        potentialRevenue: "296 000 ₽",
        lostOUKRRevenue: "20 000 ₽",
        lostOUKRPercent: 7,
    },
    {
        id: "2",
        fullName: "Петров П.П.",
        profession: "Кардиолог",

        appointments: 95,
        primary: 30,
        repeatAppointments: 65,

        requiredKR: 28,
        krServicesDone: 30,
        deviationPercent: 3,
        totalServices: 50,
        avgServicesPerVisit: 3.2,
        servicesPerVisit: 3.2,
        noServices: "5% (5)",

        assignedOUKRPercent: 107,
        servicesCompletedPercent: 90,
        overKR: 3,

        avgBill: "2 600 ₽",
        revenue: "247 000 ₽",
        potentialRevenue: "255 000 ₽",
        lostOUKRRevenue: "0 ₽",
        lostOUKRPercent: 0,
    },
    {
        id: "3",
        fullName: "Сидорова А.А.",
        profession: "Терапевт",

        appointments: 130,
        primary: 60,
        repeatAppointments: 70,

        requiredKR: 35,
        krServicesDone: 35,
        deviationPercent: 4,
        totalServices: 50,
        avgServicesPerVisit: 3.5,
        servicesPerVisit: 3.5,
        noServices: "6% (8)",

        assignedOUKRPercent: 100,
        servicesCompletedPercent: 88,
        overKR: 0,

        avgBill: "2 100 ₽",
        revenue: "273 000 ₽",
        potentialRevenue: "280 000 ₽",
        lostOUKRRevenue: "0 ₽",
        lostOUKRPercent: 0,
    },
    {
        id: "4",
        fullName: "Кузнецов Д.В.",
        profession: "Эндокринолог",

        appointments: 80,
        primary: 25,
        repeatAppointments: 55,

        requiredKR: 20,
        krServicesDone: 18,
        deviationPercent: 2,
        totalServices: 50,
        avgServicesPerVisit: 3.6,
        servicesPerVisit: 3.6,
        noServices: "4% (3)",

        assignedOUKRPercent: 90,
        servicesCompletedPercent: 82,
        overKR: 1,

        avgBill: "3 200 ₽",
        revenue: "256 000 ₽",
        potentialRevenue: "270 000 ₽",
        lostOUKRRevenue: "14 000 ₽",
        lostOUKRPercent: 6,
    },
    {
        id: "5",
        fullName: "Морозова Е.Н.",
        profession: "Кардиолог",

        appointments: 110,
        primary: 40,
        repeatAppointments: 70,

        requiredKR: 33,
        krServicesDone: 36,
        deviationPercent: 6,
        totalServices: 50,
        avgServicesPerVisit: 3.4,
        servicesPerVisit: 3.4,
        noServices: "7% (8)",

        assignedOUKRPercent: 109,
        servicesCompletedPercent: 92,
        overKR: 3,

        avgBill: "2 800 ₽",
        revenue: "308 000 ₽",
        potentialRevenue: "326 000 ₽",
        lostOUKRRevenue: "0 ₽",
        lostOUKRPercent: 0,
    },
    {
        id: "6",
        fullName: "Фёдоров С.А.",
        profession: "Эндокринолог",

        appointments: 105,
        primary: 38,
        repeatAppointments: 67,

        requiredKR: 31,
        krServicesDone: 29,
        deviationPercent: 3,
        totalServices: 50,
        avgServicesPerVisit: 3.3,
        servicesPerVisit: 3.3,
        noServices: "5% (6)",

        assignedOUKRPercent: 94,
        servicesCompletedPercent: 87,
        overKR: 2,

        avgBill: "2 700 ₽",
        revenue: "283 000 ₽",
        potentialRevenue: "300 000 ₽",
        lostOUKRRevenue: "17 000 ₽",
        lostOUKRPercent: 6,
    },
    {
        id: "7",
        fullName: "Васильева М.Г.",
        profession: "Кардиолог",

        appointments: 90,
        primary: 28,
        repeatAppointments: 62,

        requiredKR: 27,
        krServicesDone: 27,
        deviationPercent: 2,
        totalServices: 50,
        avgServicesPerVisit: 3.4,
        servicesPerVisit: 3.4,
        noServices: "6% (5)",

        assignedOUKRPercent: 100,
        servicesCompletedPercent: 89,
        overKR: 0,

        avgBill: "2 900 ₽",
        revenue: "261 000 ₽",
        potentialRevenue: "270 000 ₽",
        lostOUKRRevenue: "0 ₽",
        lostOUKRPercent: 0,
    },
    {
        id: "8",
        fullName: "Григорьев Л.Т.",
        profession: "Терапевт",

        appointments: 85,
        primary: 25,
        repeatAppointments: 60,

        requiredKR: 22,
        krServicesDone: 20,
        deviationPercent: 1,
        totalServices: 50,
        avgServicesPerVisit: 3.5,
        servicesPerVisit: 3.5,
        noServices: "3% (2)",

        assignedOUKRPercent: 91,
        servicesCompletedPercent: 90,
        overKR: 2,

        avgBill: "3 000 ₽",
        revenue: "255 000 ₽",
        potentialRevenue: "268 000 ₽",
        lostOUKRRevenue: "13 000 ₽",
        lostOUKRPercent: 5,
    },
    {
        id: "9",
        fullName: "Орлова В.С.",
        profession: "Эндокринолог",

        appointments: 100,
        primary: 32,
        repeatAppointments: 68,

        requiredKR: 30,
        krServicesDone: 31,
        deviationPercent: 3,
        totalServices: 50,
        avgServicesPerVisit: 3.4,
        servicesPerVisit: 3.4,
        noServices: "5% (5)",

        assignedOUKRPercent: 103,
        servicesCompletedPercent: 91,
        overKR: 1,

        avgBill: "2 750 ₽",
        revenue: "275 000 ₽",
        potentialRevenue: "285 000 ₽",
        lostOUKRRevenue: "0 ₽",
        lostOUKRPercent: 0,
    },
    {
        id: "10",
        fullName: "Николаев Р.И.",
        profession: "Кардиолог",

        appointments: 92,
        primary: 29,
        repeatAppointments: 63,

        requiredKR: 26,
        krServicesDone: 24,
        deviationPercent: 4,
        totalServices: 50,
        avgServicesPerVisit: 3.3,
        servicesPerVisit: 3.3,
        noServices: "6% (6)",

        assignedOUKRPercent: 92,
        servicesCompletedPercent: 86,
        overKR: 2,

        avgBill: "2 850 ₽",
        revenue: "263 000 ₽",
        potentialRevenue: "278 000 ₽",
        lostOUKRRevenue: "15 000 ₽",
        lostOUKRPercent: 6,
    },
];

export async function GET() {
    return NextResponse.json(doctors);
}
