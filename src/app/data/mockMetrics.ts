// src/app/data/mockMetrics.ts␊
import type { RawMetricData } from "@/app/metric-domain/builders/buildMetricCardData";

export const mockRawCardsData: Record<string, RawMetricData> = {
    "Приёмы": {
        factValue: 1004,
            planValue: 1115,
        lflValue: -4,
        description: "Количество проведённых приёмов за выбранный период.",
},
    "Ср.чек приема": {
        factValue: 3010,
            planValue: 3290,
        lflValue: -3,
        description: "Средний чек приёма за выбранный период.",
},
    "Соблюдение ОУКР": {
        factValue: 93,
            planValue: 100,
        lflValue: 86,
        description: "Доля назначений, соответствующих ОУКР.",
},
    "Выполняемость": {
        factValue: 80,
        planValue: 96,
            lflValue: -1,
        description: "Доля выполненных назначенных услуг.",
},
    "Ср. назначаемость на прием": {
        factValue: 3.1,
        planValue: 4,
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
        "терапевт_all_all": { percent: 87, count: 336, variant: "warning" },
        "кардиолог_all_all": { percent: 92, count: 384, variant: "success" },
        "терапевт_first_Филиал 1": { percent: 81, count: 178, variant: "warning" },
        "кардиолог_second_Филиал 2": { percent: 95, count: 204, variant: "success" },
    },
    "Ср.чек приема": {
        "терапевт_all_all": { percent: 89, count: 2870, variant: "warning" },
        "кардиолог_all_all": { percent: 94, count: 3240, variant: "success" },
        "терапевт_first_Филиал 1": { percent: 85, count: 2790, variant: "warning" },
        "кардиолог_second_Филиал 2": { percent: 96, count: 3320, variant: "success" },
    },
    "Соблюдение ОУКР": {
    "терапевт_all_all": { percent: 82, count: 85, variant: "warning" },
    "кардиолог_all_all": { percent: 78, count: 79, variant: "error" },
    "терапевт_first_Филиал 3": { percent: 74, count: 76, variant: "error" },
    "кардиолог_second_Филиал 1": { percent: 88, count: 89, variant: "warning" },
},
    "Выполняемость": {
    "терапевт_all_all": { percent: 83, count: 81, variant: "warning" },
    "кардиолог_all_all": { percent: 91, count: 88, variant: "success" },
    "терапевт_first_Филиал 3": { percent: 77, count: 74, variant: "error" },
    "кардиолог_second_Филиал 1": { percent: 89, count: 86, variant: "warning" },
},
    "Ср. назначаемость на прием": {
    "терапевт_all_all": { percent: 88, count: 3.0, variant: "warning" },
    "кардиолог_all_all": { percent: 92, count: 3.3, variant: "success" },
    "терапевт_first_Филиал 1": { percent: 84, count: 2.9, variant: "warning" },
    "кардиолог_second_Филиал 2": { percent: 95, count: 3.4, variant: "success" },
},
};
