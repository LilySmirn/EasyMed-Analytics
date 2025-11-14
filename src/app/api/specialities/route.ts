import { NextResponse } from "next/server";

const doctors = [
    { id: "1", fullName: "Иванов И.И.", profession: "Терапевт", revenue: 276000, totalServices: 400, avgBill: 2300, deviationPercent: 5 },
    { id: "2", fullName: "Петров П.П.", profession: "Кардиолог", revenue: 247000, totalServices: 310, avgBill: 2600, deviationPercent: 3 },
    { id: "3", fullName: "Сидорова А.А.", profession: "Терапевт", revenue: 273000, totalServices: 450, avgBill: 2100, deviationPercent: 4 },
    { id: "4", fullName: "Кузнецов Д.В.", profession: "Эндокринолог", revenue: 256000, totalServices: 290, avgBill: 3200, deviationPercent: 2 },
    { id: "5", fullName: "Морозова Е.Н.", profession: "Кардиолог", revenue: 308000, totalServices: 370, avgBill: 2800, deviationPercent: 6 },
    { id: "6", fullName: "Фёдоров С.А.", profession: "Эндокринолог", revenue: 283000, totalServices: 350, avgBill: 2700, deviationPercent: 3 },
    { id: "7", fullName: "Васильева М.Г.", profession: "Кардиолог", revenue: 261000, totalServices: 310, avgBill: 2900, deviationPercent: 2 },
    { id: "8", fullName: "Григорьев Л.Т.", profession: "Терапевт", revenue: 255000, totalServices: 300, avgBill: 3000, deviationPercent: 1 },
    { id: "9", fullName: "Орлова В.С.", profession: "Эндокринолог", revenue: 275000, totalServices: 340, avgBill: 2750, deviationPercent: 3 },
    { id: "10", fullName: "Николаев Р.И.", profession: "Кардиолог", revenue: 263000, totalServices: 320, avgBill: 2850, deviationPercent: 4 },
];

// агрегируем по специальностям
const specialtiesMap: Record<string, { revenue: number; lostRevenue: number; totalServices: number; completedServices: number; deviationSum: number; avgBillSum: number; count: number }> = {};

doctors.forEach((doc) => {
    if (!specialtiesMap[doc.profession]) {
        specialtiesMap[doc.profession] = { revenue: 0, lostRevenue: 0, totalServices: 0, completedServices: 0, deviationSum: 0, avgBillSum: 0, count: 0 };
    }
    const s = specialtiesMap[doc.profession];
    s.revenue += doc.revenue;
    s.lostRevenue += Math.floor((doc.revenue * doc.deviationPercent) / 100);
    s.totalServices += doc.totalServices;
    s.completedServices += doc.totalServices - Math.floor((doc.totalServices * doc.deviationPercent) / 100);
    s.deviationSum += doc.deviationPercent;
    s.avgBillSum += doc.avgBill;
    s.count += 1;
});

const specialties = Object.entries(specialtiesMap).map(([name, val], index) => ({
    id: (index + 1).toString(),
    name,
    revenue: val.revenue,
    lostRevenue: val.lostRevenue,
    percentAssigned: 100,
    percentCompleted: Math.round((val.completedServices / val.totalServices) * 100),
    percentDeviation: Math.round(val.deviationSum / val.count),
    avgBill: Math.round(val.avgBillSum / val.count),
}));

export async function GET() {
    return NextResponse.json(specialties);
}
