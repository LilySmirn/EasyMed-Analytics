import { NextResponse } from "next/server";

export async function GET() {
    const nosologies = [
        {
            id: "1",
            name: "Артериальная гипертензия",
            appointments: 1420,
            primaryAppointments: 780,
            repeatAppointments: 640,
            appointmentsWithoutServices: 18,

            oukr: 30, // Обязательных услуг по КР

            assignedOUKRAvg: 15.7, // Назначено обязательных услуг (среднее количество назначенных ОУКР)
            servicesCompletedPercent: 83, // Выполнено услуг (%)

            overKR: 47.7, // Доля нереализованных ОКР (%)

            totalServicesAssigned: 30388, // Всего назначено услуг
            avgServicesPerVisit: 21.4, // Средняя назначаемость на приём (всего)

            revenue: "17 202 410 ₽", // Фактическая выручка
            avgCheck: "12 115 ₽", // Средний чек

            potentialRevenue: "31 868 320 ₽", // Потенциальная выручка

            lostOUKRRevenue: "11 646 740 ₽", // Недореализованные ОКР
            lostOUKRPercent: 47.7, // Доля нереализованных ОКР
            patientRevenueLoss: "3 019 170 ₽",
        },
        {
            id: "2",
            name: "Генерализованный остеоартрит (полиартроз)",
            appointments: 1280,
            primaryAppointments: 690,
            repeatAppointments: 590,
            appointmentsWithoutServices: 21,

            oukr: 15,
            assignedOUKRAvg: 12.3,

            servicesCompletedPercent: 62,
            overKR: 18.0,

            totalServicesAssigned: 20608,
            avgServicesPerVisit: 16.1,

            revenue: "7 372 800 ₽",
            avgCheck: "5 760 ₽",

            potentialRevenue: "13 862 825 ₽",

            lostOUKRRevenue: "1 987 200 ₽",
            lostOUKRPercent: 18.0,
            patientRevenueLoss: "4 502 825 ₽",
        },
        {
            id: "3",
            name: "Хроническая сердечная недостаточность",
            appointments: 1150,
            primaryAppointments: 520,
            repeatAppointments: 630,
            appointmentsWithoutServices: 9,

            oukr: 24,
            assignedOUKRAvg: 22,

            servicesCompletedPercent: 93,
            overKR: 8.3,

            totalServicesAssigned: 31625,
            avgServicesPerVisit: 27.5,

            revenue: "21 344 000 ₽",
            avgCheck: "18 560 ₽",

            potentialRevenue: "25 387 000 ₽",

            lostOUKRRevenue: "2 760 000 ₽",
            lostOUKRPercent: 8.3,
            patientRevenueLoss: "1 283 000 ₽",
        },
        {
            id: "4",
            name: "Ишемическая болезнь сердца",
            appointments: 724,
            primaryAppointments: 453,
            repeatAppointments: 271,
            appointmentsWithoutServices: 7,

            oukr: 6,
            assignedOUKRAvg: 3.7,

            servicesCompletedPercent: 73,
            overKR: 38.3,

            totalServicesAssigned: 4567,
            avgServicesPerVisit: 6.3,

            revenue: "2 500 928 ₽",
            avgCheck: "3 452 ₽",

            potentialRevenue: "4 886 648 ₽",

            lostOUKRRevenue: "957 648 ₽",
            lostOUKRPercent: 38.3,
            patientRevenueLoss: "603 750 ₽",
        },
        {
            id: "5",
            name: "Инфаркт миокарда с подъёмом сегмента ST",
            appointments: 631,
            primaryAppointments: 347,
            repeatAppointments: 284,
            appointmentsWithoutServices: 0,

            oukr: 9,
            assignedOUKRAvg: 4.2,

            servicesCompletedPercent: 61,
            overKR: 53.3,

            totalServicesAssigned: 4480,
            avgServicesPerVisit: 7.1,

            revenue: "1 571 475 ₽",
            avgCheck: "2 490 ₽",

            potentialRevenue: "4 317 560 ₽",

            lostOUKRRevenue: "741 560 ₽",
            patientRevenueLoss: "1 004 525 ₽",
            lostOUKRPercent: 53.3,
        },
        {
            id: "6",
            name: "Хроническая обструктивная лёгочная болезнь",
            appointments: 520,
            primaryAppointments: 290,
            repeatAppointments: 230,
            appointmentsWithoutServices: 11,

            oukr: 12,
            assignedOUKRAvg: 8.1,

            servicesCompletedPercent: 58,
            overKR: 32.5,

            totalServicesAssigned: 5928,
            avgServicesPerVisit: 11.4,

            revenue: "1 955 200 ₽",
            avgCheck: "3 760 ₽",

            potentialRevenue: "4 691 400 ₽",

            lostOUKRRevenue: "1 318 200 ₽",
            patientRevenueLoss: "1 418 000 ₽",
            lostOUKRPercent: 32.5,
        },
        {
            id: "7",
            name: "Бронхиальная астма",
            appointments: 480,
            primaryAppointments: 260,
            repeatAppointments: 220,
            appointmentsWithoutServices: 8,

            oukr: 6,
            assignedOUKRAvg: 4.3,

            servicesCompletedPercent: 74,
            overKR: 28.3,

            totalServicesAssigned: 3312,
            avgServicesPerVisit: 6.9,

            revenue: "7 836 800 ₽",
            avgCheck: "3 200 ₽",

            potentialRevenue: "11 817 600 ₽",

            lostOUKRRevenue: "1 219 200 ₽",
            patientRevenueLoss: "2 761 600 ₽",
            lostOUKRPercent: 28.3,
        },
        {
            id: "8",
            name: "Нарушение липидного обмена",
            appointments: 450,
            primaryAppointments: 240,
            repeatAppointments: 210,
            appointmentsWithoutServices: 7,

            oukr: 5,
            assignedOUKRAvg: 4.8,

            servicesCompletedPercent: 95,
            overKR: 4,

            totalServicesAssigned: 2790,
            avgServicesPerVisit: 6.2,

            revenue: "7 685 000 ₽",
            avgCheck: "2 900 ₽",

            potentialRevenue: "8 671 000 ₽",

            lostOUKRRevenue: "580 000 ₽",
            patientRevenueLoss: "406 000 ₽",
            lostOUKRPercent: 4,
        },
        {
            id: "9",
            name: "Суправентрикулярная (наджелудочковая) тахикардия",
            appointments: 440,
            primaryAppointments: 230,
            repeatAppointments: 210,
            appointmentsWithoutServices: 6,

            oukr: 6,
            assignedOUKRAvg: 5,

            servicesCompletedPercent: 89,
            overKR: 16.7,

            totalServicesAssigned: 3432,
            avgServicesPerVisit: 7.8,

            revenue: "9 467 400 ₽",
            avgCheck: "3 100 ₽",

            potentialRevenue: "11 569 200 ₽",

            lostOUKRRevenue: "930 000 ₽",
            patientRevenueLoss: "1 171 800 ₽",
            lostOUKRPercent: 16.7,
        },
        {
            id: "10",
            name: "Гастроэзофагеальная рефлюксная болезнь у детей",
            appointments: 450,
            primaryAppointments: 240,
            repeatAppointments: 210,
            appointmentsWithoutServices: 5,

            oukr: 8,
            assignedOUKRAvg: 6.2,

            servicesCompletedPercent: 79,
            overKR: 22.5,

            totalServicesAssigned: 3825,
            avgServicesPerVisit: 8.5,

            revenue: "8 909 000 ₽",
            avgCheck: "2 950 ₽",

            potentialRevenue: "12 779 000 ₽",

            lostOUKRRevenue: "1 495 000 ₽",
            patientRevenueLoss: "2 375 000 ₽",
            lostOUKRPercent: 22.5,
        },
];

    return NextResponse.json(nosologies);
}
