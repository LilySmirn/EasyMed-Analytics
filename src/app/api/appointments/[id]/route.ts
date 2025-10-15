import { NextResponse } from "next/server";

const appointmentsDetails: Record<string, any[]> = {
    a1: [
        { id: "s1", name: "ЭКГ", assigned: true, reason: "-", cost: "1 000 ₽", done: true },
        { id: "s2", name: "Консультация терапевта", assigned: true, reason: "-", cost: "2 000 ₽", done: true },
        { id: "s3", name: "МРТ", assigned: false, reason: "Нет показаний", cost: "3 000 ₽", done: false },
    ],
    a2: [
        { id: "s4", name: "Флюорография", assigned: true, reason: "-", cost: "1 500 ₽", done: true },
        { id: "s5", name: "Общий анализ крови", assigned: true, reason: "-", cost: "700 ₽", done: true },
    ],
    a3: [
        { id: "s6", name: "ЭЭГ", assigned: true, reason: "-", cost: "2 000 ₽", done: true },
    ],
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const details = appointmentsDetails[id] || [];
    return NextResponse.json(details);
}
