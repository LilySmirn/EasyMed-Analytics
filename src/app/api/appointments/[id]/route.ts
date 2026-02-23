import { NextResponse } from "next/server";

type AppointmentDetail = {
    id: string;
    name: string;
    assigned: boolean;
    reason: string;
    cost: string;
    done: boolean;
    clinical: boolean;
};

const appointmentsDetails: Record<string, AppointmentDetail[]> = {
    a1: [
        { id: "s1", name: "Общий анализ крови", assigned: true, reason: "-", cost: "650 ₽", done: true, clinical: true },
        { id: "s2", name: "С-реактивный белок", assigned: true, reason: "-", cost: "850 ₽", done: true, clinical: true },
        { id: "s3", name: "Пульсоксиметрия", assigned: true, reason: "-", cost: "400 ₽", done: true, clinical: true },
        { id: "s4", name: "Витамин D", assigned: false, reason: "Нет клинических показаний", cost: "1 000 ₽", done: false, clinical: false },
    ],
    a2: [
        { id: "s5", name: "Общий анализ крови", assigned: true, reason: "-", cost: "650 ₽", done: true, clinical: true },
        { id: "s6", name: "Рентген органов грудной клетки", assigned: true, reason: "-", cost: "1 400 ₽", done: true, clinical: true },
        { id: "s7", name: "Посев мокроты", assigned: false, reason: "Пациент отказался", cost: "1 100 ₽", done: false, clinical: true },
    ],
    a3: [
        { id: "s8", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s9", name: "СМАД", assigned: true, reason: "-", cost: "1 800 ₽", done: true, clinical: true },
        { id: "s10", name: "Липидограмма", assigned: true, reason: "-", cost: "950 ₽", done: true, clinical: true },
        { id: "s11", name: "Дуплекс БЦА", assigned: true, reason: "-", cost: "1 450 ₽", done: false, clinical: true },
    ],
    a4: [
        { id: "s12", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s13", name: "ЭхоКГ", assigned: true, reason: "-", cost: "2 100 ₽", done: true, clinical: true },
        { id: "s14", name: "КТ грудной клетки", assigned: false, reason: "Нет показаний по протоколу", cost: "3 200 ₽", done: false, clinical: false },
    ],
    a5: [
        { id: "s15", name: "Гликированный гемоглобин", assigned: true, reason: "-", cost: "1 100 ₽", done: true, clinical: true },
        { id: "s16", name: "Глюкоза плазмы", assigned: true, reason: "-", cost: "450 ₽", done: true, clinical: true },
        { id: "s17", name: "Микроальбуминурия", assigned: true, reason: "-", cost: "900 ₽", done: false, clinical: true },
    ],
    a6: [
        { id: "s18", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s19", name: "Липидограмма", assigned: true, reason: "-", cost: "950 ₽", done: true, clinical: true },
        { id: "s20", name: "Коагулограмма", assigned: true, reason: "-", cost: "1 200 ₽", done: true, clinical: true },
        { id: "s21", name: "NT-proBNP", assigned: true, reason: "-", cost: "2 100 ₽", done: false, clinical: true },
    ],
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const details = appointmentsDetails[id] || [];
    return NextResponse.json(details);
}
