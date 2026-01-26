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
    },
    "Ср.чек приема": {
        factValue: 4150,
        planValue: 5000,
        lflValue: -17,
    },
    "Соблюдение ОУКР": {
        factValue: 126, // фактическое соблюдение
        planValue: 180, // идеал ОУКР
        lflValue: -5,
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
};
