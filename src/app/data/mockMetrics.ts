// src/app/data/mockMetrics.ts
import type { RawMetricData } from "@/app/metric-domain/builders/buildMetricCardData";

export const mockRawCardsData: Record<string, RawMetricData> = {
    "Приёмы": {
        factValue: 1040,
        planValue: 1120,
        lflValue: -4,
        description: "Количество проведённых приёмов за выбранный период.",
    },
    "Ср.чек приема": {
        factValue: 2950,
        planValue: 3100,
        lflValue: -3,
        description: "Средний чек приёма за выбранный период.",
    },
    "Соблюдение ОУКР": {
        factValue: 89,
        planValue: 92,
        lflValue: -2,
        description: "Доля назначений, соответствующих ОУКР.",
    },
    "Выполняемость": {
        factValue: 86,
        planValue: 90,
        lflValue: -1,
        description: "Доля выполненных назначенных услуг.",
    },
    "Ср. назначаемость на прием": {
        factValue: 3.1,
        planValue: 3.3,
        lflValue: -2,
        description: "Среднее количество назначений на один приём.",
    },
};

export const mockLFL: Record<
    string,
    Record<
        string,
        {
            percent: number;
            count: number;
            variant?: "default" | "error" | "success" | "warning";
        }
    >
> = {
    "Приёмы": {
        "терапевт_all_all": { percent: -3, count: 430, variant: "warning" },
        "кардиолог_all_all": { percent: 4, count: 340, variant: "success" },
        "терапевт_first_Филиал 1": { percent: -6, count: 220, variant: "error" },
        "кардиолог_second_Филиал 2": { percent: 7, count: 180, variant: "success" },
    },
    "Ср.чек приема": {
        "терапевт_all_all": { percent: 2, count: 2870, variant: "success" },
        "кардиолог_all_all": { percent: 5, count: 3240, variant: "success" },
        "терапевт_first_Филиал 1": { percent: -1, count: 2790, variant: "warning" },
        "кардиолог_second_Филиал 2": { percent: 6, count: 3320, variant: "success" },
    },
    "Соблюдение ОУКР": {
        "терапевт_all_all": { percent: -2, count: 87, variant: "warning" },
        "кардиолог_all_all": { percent: 1, count: 92, variant: "success" },
        "терапевт_first_Филиал 3": { percent: -4, count: 85, variant: "error" },
        "кардиолог_second_Филиал 1": { percent: 3, count: 93, variant: "success" },
    },
    "Выполняемость": {
        "терапевт_all_all": { percent: -1, count: 84, variant: "warning" },
        "кардиолог_all_all": { percent: 2, count: 89, variant: "success" },
        "терапевт_first_Филиал 3": { percent: -3, count: 82, variant: "error" },
        "кардиолог_second_Филиал 1": { percent: 4, count: 90, variant: "success" },
    },
};
