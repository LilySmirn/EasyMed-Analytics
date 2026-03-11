import { NextResponse } from "next/server";

type AppointmentDetail = {
    id: string;
    name: string;
    mandatoryOukr?: boolean;
    assigned: boolean;
    reason: string;
    cost: string;
    done: boolean;
    clinical: boolean;
};

const appointmentsDetails: Record<string, AppointmentDetail[]> = {
    a1: [
        { id: "s10", name: "ЭКГ в 12 отведениях", mandatoryOukr: true, assigned: true, reason: "-", cost: "2 160 ₽", done: true, clinical: true },
        { id: "s11", name: "Электрокардиографический мониторинг", mandatoryOukr: true, assigned: true, reason: "-", cost: "3 200 ₽", done: true, clinical: true },
        { id: "s13", name: "Определение уровня тропонина Т/И", mandatoryOukr: true, assigned: false, reason: "-", cost: "1 200 ₽", done: false, clinical: true },
        { id: "s13", name: "Эхокардиография", mandatoryOukr: true, assigned: true, reason: "-", cost: "5 000 ₽", done: false, clinical: true },
        { id: "s14", name: "Рентгенография грудной клетки", mandatoryOukr: true, assigned: false, reason: "-", cost: "1 400 ₽", done: false, clinical: true },
        { id: "s15", name: "Биохимический анализ крови", mandatoryOukr: true, assigned: false, reason: "-", cost: "1 000 ₽", done: false, clinical: true },
        { id: "s16", name: "Анализ мочи", mandatoryOukr: true, assigned: false, reason: "-", cost: "300 ₽", done: false, clinical: true },
        { id: "s17", name: "КТ грудной клетки", assigned: false, reason: "-", cost: "3 000 ₽", done: false, clinical: false },
    ],
    a2: [
        { id: "s4", name: "Общий анализ крови", assigned: true, reason: "-", cost: "650 ₽", done: true, clinical: true },
        { id: "s5", name: "Рентген органов грудной клетки", assigned: true, reason: "-", cost: "1 400 ₽", done: true, clinical: true },
        { id: "s6", name: "Посев мокроты", assigned: false, reason: "Пациент отказался", cost: "1 100 ₽", done: false, clinical: true },
    ],
    a3: [
        { id: "s7", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s8", name: "СМАД", assigned: true, reason: "-", cost: "1 800 ₽", done: true, clinical: true },
        { id: "s9", name: "Липидограмма", assigned: true, reason: "-", cost: "950 ₽", done: true, clinical: true },
    ],
    a4: [
        { id: "s10", name: "ЭКГ в 12 отведениях", mandatoryOukr: true, assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s11", name: "Электрокардиографический мониторинг", mandatoryOukr: true, assigned: true, reason: "-", cost: "1 800 ₽", done: true, clinical: true },
        { id: "s12", name: "Эхокардиография", mandatoryOukr: true, assigned: true, reason: "-", cost: "2 100 ₽", done: true, clinical: true },
        { id: "s13", name: "Определение уровня тропонина Т/И", mandatoryOukr: true, assigned: true, reason: "-", cost: "1 200 ₽", done: true, clinical: true },
        { id: "s14", name: "Рентгенография грудной клетки", mandatoryOukr: true, assigned: true, reason: "-", cost: "1 400 ₽", done: true, clinical: true },
        { id: "s15", name: "Биохимический анализ крови", mandatoryOukr: true, assigned: true, reason: "-", cost: "1 000 ₽", done: true, clinical: true },
        { id: "s16", name: "Анализ мочи", mandatoryOukr: true, assigned: true, reason: "-", cost: "500 ₽", done: true, clinical: true },
    ],
    a5: [
        { id: "s13", name: "Общий анализ крови", assigned: true, reason: "-", cost: "650 ₽", done: true, clinical: true },
        { id: "s14", name: "ПЦР на респираторные инфекции", assigned: true, reason: "-", cost: "1 300 ₽", done: true, clinical: true },
        { id: "s15", name: "Консультация оториноларинголога", assigned: false, reason: "Не требуется", cost: "1 800 ₽", done: false, clinical: false },
    ],
    a6: [
        { id: "s16", name: "Общий анализ крови", assigned: true, reason: "-", cost: "650 ₽", done: true, clinical: true },
        { id: "s17", name: "Спирометрия", assigned: true, reason: "-", cost: "1 200 ₽", done: true, clinical: true },
        { id: "s18", name: "Флюорография", assigned: true, reason: "-", cost: "1 500 ₽", done: false, clinical: true },
    ],
    a7: [
        { id: "s19", name: "Гликированный гемоглобин", assigned: true, reason: "-", cost: "1 100 ₽", done: true, clinical: true },
        { id: "s20", name: "Глюкоза плазмы", assigned: true, reason: "-", cost: "450 ₽", done: true, clinical: true },
        { id: "s21", name: "Микроальбуминурия", assigned: true, reason: "-", cost: "900 ₽", done: false, clinical: true },
    ],
    a8: [
        { id: "s22", name: "Гликированный гемоглобин", assigned: true, reason: "-", cost: "1 100 ₽", done: true, clinical: true },
        { id: "s23", name: "ТТГ", assigned: true, reason: "-", cost: "700 ₽", done: true, clinical: true },
        { id: "s24", name: "УЗИ щитовидной железы", assigned: true, reason: "-", cost: "1 600 ₽", done: false, clinical: true },
    ],
    a9: [
        { id: "s25", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s26", name: "Липидограмма", assigned: true, reason: "-", cost: "950 ₽", done: true, clinical: true },
        { id: "s27", name: "Коагулограмма", assigned: true, reason: "-", cost: "1 200 ₽", done: true, clinical: true },
    ],
    a10: [
        { id: "s28", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s29", name: "ЭхоКГ", assigned: true, reason: "-", cost: "2 100 ₽", done: true, clinical: true },
        { id: "s30", name: "NT-proBNP", assigned: true, reason: "-", cost: "2 100 ₽", done: false, clinical: true },
    ],
    a11: [
        { id: "s31", name: "Гликированный гемоглобин", assigned: true, reason: "-", cost: "1 100 ₽", done: true, clinical: true },
        { id: "s32", name: "Инсулин", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s33", name: "Осмотр глазного дна", assigned: true, reason: "-", cost: "1 300 ₽", done: false, clinical: true },
    ],
    a12: [
        { id: "s34", name: "Глюкоза плазмы", assigned: true, reason: "-", cost: "450 ₽", done: true, clinical: true },
        { id: "s35", name: "Креатинин", assigned: true, reason: "-", cost: "500 ₽", done: true, clinical: true },
        { id: "s36", name: "УЗИ почек", assigned: true, reason: "-", cost: "1 450 ₽", done: false, clinical: true },
    ],
    a13: [
        { id: "s37", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s38", name: "СМАД", assigned: true, reason: "-", cost: "1 800 ₽", done: true, clinical: true },
        { id: "s39", name: "Липидограмма", assigned: true, reason: "-", cost: "950 ₽", done: false, clinical: true },
    ],
    a14: [
        { id: "s40", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s41", name: "ЭхоКГ", assigned: true, reason: "-", cost: "2 100 ₽", done: false, clinical: true },
        { id: "s42", name: "КТ-коронарография", assigned: false, reason: "Отложено до стабилизации", cost: "4 200 ₽", done: false, clinical: false },
    ],
    a15: [
        { id: "s43", name: "Общий анализ крови", assigned: true, reason: "-", cost: "650 ₽", done: true, clinical: true },
        { id: "s44", name: "СРБ", assigned: true, reason: "-", cost: "850 ₽", done: true, clinical: true },
        { id: "s45", name: "Пульсоксиметрия", assigned: true, reason: "-", cost: "400 ₽", done: true, clinical: true },
    ],
    a16: [
        { id: "s46", name: "Общий анализ крови", assigned: true, reason: "-", cost: "650 ₽", done: true, clinical: true },
        { id: "s47", name: "Флюорография", assigned: true, reason: "-", cost: "1 500 ₽", done: true, clinical: true },
        { id: "s48", name: "Витамин D", assigned: false, reason: "Нет клинических показаний", cost: "1 000 ₽", done: false, clinical: false },
    ],
    a17: [
        { id: "s49", name: "Глюкоза плазмы", assigned: true, reason: "-", cost: "450 ₽", done: true, clinical: true },
        { id: "s50", name: "Гликированный гемоглобин", assigned: true, reason: "-", cost: "1 100 ₽", done: true, clinical: true },
        { id: "s51", name: "Микроальбуминурия", assigned: true, reason: "-", cost: "900 ₽", done: false, clinical: true },
    ],
    a18: [
        { id: "s52", name: "ТТГ", assigned: true, reason: "-", cost: "700 ₽", done: true, clinical: true },
        { id: "s53", name: "Т4 свободный", assigned: true, reason: "-", cost: "750 ₽", done: true, clinical: true },
        { id: "s54", name: "УЗИ щитовидной железы", assigned: true, reason: "-", cost: "1 600 ₽", done: false, clinical: true },
    ],
    a19: [
        { id: "s55", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s56", name: "Липидограмма", assigned: true, reason: "-", cost: "950 ₽", done: true, clinical: true },
        { id: "s57", name: "Коагулограмма", assigned: true, reason: "-", cost: "1 200 ₽", done: false, clinical: true },
    ],
    a20: [
        { id: "s58", name: "ЭКГ", assigned: true, reason: "-", cost: "900 ₽", done: true, clinical: true },
        { id: "s59", name: "ЭхоКГ", assigned: true, reason: "-", cost: "2 100 ₽", done: true, clinical: true },
        { id: "s60", name: "NT-proBNP", assigned: true, reason: "-", cost: "2 100 ₽", done: false, clinical: true },
    ],
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const details = appointmentsDetails[id] || [];
    return NextResponse.json(details);
}
