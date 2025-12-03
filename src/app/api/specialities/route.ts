import { NextResponse } from "next/server";

const doctors = [
    { id: "1", fullName: "Иванов И.И.", profession: "Терапевт", revenue: 276000, totalServices: 400, avgBill: 2300, deviationPercent: 5, primary: 150, requiredKR: 50 },
    { id: "2", fullName: "Петров П.П.", profession: "Кардиолог", revenue: 247000, totalServices: 310, avgBill: 2600, deviationPercent: 3, primary: 120, requiredKR: 30 },
    { id: "3", fullName: "Сидорова А.А.", profession: "Терапевт", revenue: 273000, totalServices: 450, avgBill: 2100, deviationPercent: 4, primary: 160, requiredKR: 60 },
    { id: "4", fullName: "Кузнецов Д.В.", profession: "Эндокринолог", revenue: 256000, totalServices: 290, avgBill: 3200, deviationPercent: 2, primary: 100, requiredKR: 40 },
    { id: "5", fullName: "Морозова Е.Н.", profession: "Кардиолог", revenue: 308000, totalServices: 370, avgBill: 2800, deviationPercent: 6, primary: 130, requiredKR: 35 },
    { id: "6", fullName: "Фёдоров С.А.", profession: "Эндокринолог", revenue: 283000, totalServices: 350, avgBill: 2700, deviationPercent: 3, primary: 110, requiredKR: 45 },
    { id: "7", fullName: "Васильева М.Г.", profession: "Кардиолог", revenue: 261000, totalServices: 310, avgBill: 2900, deviationPercent: 2, primary: 125, requiredKR: 25 },
    { id: "8", fullName: "Григорьев Л.Т.", profession: "Терапевт", revenue: 255000, totalServices: 300, avgBill: 3000, deviationPercent: 1, primary: 140, requiredKR: 55 },
    { id: "9", fullName: "Орлова В.С.", profession: "Эндокринолог", revenue: 275000, totalServices: 340, avgBill: 2750, deviationPercent: 3, primary: 105, requiredKR: 35 },
    { id: "10", fullName: "Николаев Р.И.", profession: "Кардиолог", revenue: 263000, totalServices: 320, avgBill: 2850, deviationPercent: 4, primary: 115, requiredKR: 40 },
];

// агрегируем по специальностям
const specialtiesMap: Record<string, {
    appointments: number;
    primary: number;
    requiredKR: number;
    deviationSum: number;
    totalServices: number;
    avgServicesSum: number;
    noServicesCount: number;
    avgBillSum: number;
    revenueSum: number;
    count: number;
}> = {};

doctors.forEach((doc) => {
    if (!specialtiesMap[doc.profession]) {
        specialtiesMap[doc.profession] = {
            appointments: 0,
            primary: 0,
            requiredKR: 0,
            deviationSum: 0,
            totalServices: 0,
            avgServicesSum: 0,
            noServicesCount: 0,
            avgBillSum: 0,
            revenueSum: 0,
            count: 0,
        };
    }

    const s = specialtiesMap[doc.profession];
    s.appointments += doc.totalServices; // для примера, можно заменить реальной логикой
    s.primary += doc.primary;
    s.requiredKR += doc.requiredKR;
    s.deviationSum += doc.deviationPercent;
    s.totalServices += doc.totalServices;
    s.avgServicesSum += doc.totalServices; // можно считать как среднее услуг на приём
    s.noServicesCount += Math.floor(doc.totalServices * doc.deviationPercent / 100); // пример
    s.avgBillSum += doc.avgBill;
    s.revenueSum += doc.revenue;
    s.count += 1;
});

const specialties = Object.entries(specialtiesMap).map(([name, val], index) => ({
    id: (index + 1).toString(),
    name,
    appointments: val.appointments,
    primary: val.primary,
    requiredKR: val.requiredKR,
    deviationPercent: Math.round(val.deviationSum / val.count),
    totalServices: val.totalServices,
    avgServicesPerVisit: Math.round(val.avgServicesSum / val.count),
    noServices: `${Math.round((val.noServicesCount / val.totalServices) * 100)}% (${val.noServicesCount})`,
    avgBill: Math.round(val.avgBillSum / val.count).toLocaleString("ru-RU") + " ₽",
    revenue: val.revenueSum.toLocaleString("ru-RU") + " ₽",
}));

export async function GET() {
    return NextResponse.json(specialties);
}
