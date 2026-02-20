// src/app/data/mockMetrics.ts
import type { RawMetricData } from "@/app/metric-domain/builders/buildMetricCardData";

// ------------------------------
// Raw данные от заказчика
// ------------------------------
export const mockRawCardsData: Record<string, RawMetricData> = {
    "Приёмы": {
        factValue: 3300, // фактические приёмы
        planValue: 10000, // плановые приёмы (может отсутствовать)
        lflValue: 95, // для LFL можно использовать базовый процент, builder пересчитает по фильтрам
        description: "Количество проведённых приёмов за выбранный период.",
    },
    "Ср.чек приема": {
        factValue: 4150,
        planValue: 5000,
        lflValue: -17,
        description: "Средний чек приёма за выбранный период.",
    },
    "Соблюдение ОУКР": {
        factValue: 150, // фактическое соблюдение
        planValue: 180, // идеал ОУКР
        lflValue: -5,
        description: "Соблюдение ОУКР.",
    },
    "Выполняемость": {
        factValue: 94, // фактическое
        planValue: 210, // план
        lflValue: -7,
        description: "Выполненные клинические рекомендации.",
    },
    "Ср. назначаемость на прием": {
        factValue: 84, // фактическое
        planValue: 105, // план
        lflValue: 94,
        description: "Средняя назначаемость на прием за выбранный период.",
    },
};

// ------------------------------
// Mock LFL для каждой карточки в зависимости от комбинации верхних фильтров
// ------------------------------
export const mockLFL: Record<
    string, // карточка
    Record<
        string, // комбинация фильтров
        {
            percent: number;
            count: number;
            variant?: "default" | "error" | "success" | "warning";
        }
    >
> = {
    "Приёмы": {
        "терапевт_all_all": { percent: -10, count: 12, variant: "default" },
        "кардиолог_all_all": { percent: 5, count: 15, variant: "error" },
        "терапевт_first_Филиал 1": { percent: 45, count: 20, variant: "default" },
        "кардиолог_second_Филиал 2": { percent: 50, count: 22, variant: "error" },
    },
    "Ср.чек приема": {
        "терапевт_all_all": { percent: 30, count: 15, variant: "default" },
        "кардиолог_all_all": { percent: 40, count: 18, variant: "error" },
        "терапевт_first_Филиал 1": { percent: 55, count: 23, variant: "default" },
        "кардиолог_second_Филиал 2": { percent: 60, count: 25, variant: "error" },
    },
    "Соблюдение ОУКР": {
        "терапевт_all_all": { percent: 28, count: 14, variant: "default" },
        "кардиолог_all_all": { percent: 38, count: 17, variant: "error" },
        "терапевт_first_Филиал 3": { percent: 48, count: 21, variant: "default" },
        "кардиолог_second_Филиал 1": { percent: 52, count: 24, variant: "error" },
    },
    "Выполняемость": {
        "терапевт_all_all": { percent: 28, count: 14, variant: "default" },
        "кардиолог_all_all": { percent: 38, count: 17, variant: "error" },
        "терапевт_first_Филиал 3": { percent: 48, count: 21, variant: "default" },
        "кардиолог_second_Филиал 1": { percent: 52, count: 24, variant: "error" },
    },
};
