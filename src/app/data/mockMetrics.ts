// src/app/data/mockMetrics.ts
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
    "Потерянная выручка": {
        factValue: 154261,
        lflValue: 20,
        rightFilterValue: 1.5,
        displayValue: "154 261 ₽",
        leftFilterCountDisplay: " (30 456 ₽)",
        description: "Оценка упущенной выручки за выбранный период.",
    },
    "Потенциальная выручка": {
        factValue: 11.1,
        planValue: 15,
        lflValue: +20,
        rightFilterValue: 28,
        description: "Потенциальная выручка за выбранный период.",
    },
    "Выручка": {
        factValue: 11.1,
        planValue: 15,
        lflValue: +20,
        rightFilterValue: 28,
        description: "Выручка за выбранный период.",
    },
    "Повторные приёмы": {
        factValue: 11.1,
        planValue: 15,
        lflValue: +20,
        rightFilterValue: 28,
        description: "Повторные приёмы за выбранный период.",
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
        "терапевт_all_all": { percent: 89, count: 336, variant: "warning" },
        "кардиолог_all_all": { percent: 93, count: 384, variant: "success" },
        "терапевт_first_Филиал 1": { percent: 85, count: 174, variant: "warning" },
        "кардиолог_second_Филиал 2": { percent: 95, count: 198, variant: "success" },
    },
    "Ср.чек приема": {
        "терапевт_all_all": { percent: 91, count: 2890, variant: "warning" },
        "кардиолог_all_all": { percent: 94, count: 3260, variant: "success" },
        "терапевт_first_Филиал 1": { percent: 87, count: 2810, variant: "warning" },
        "кардиолог_second_Филиал 2": { percent: 96, count: 3340, variant: "success" },
    },
    "Соблюдение ОУКР": {
        "терапевт_all_all": { percent: 92, count: 92, variant: "warning" },
        "кардиолог_all_all": { percent: 95, count: 95, variant: "success" },
        "терапевт_first_Филиал 1": { percent: 89, count: 89, variant: "warning" },
        "кардиолог_second_Филиал 2": { percent: 96, count: 96, variant: "success" },
    },
    "Выполняемость": {
        "терапевт_all_all": { percent: 79, count: 79, variant: "warning" },
        "кардиолог_all_all": { percent: 82, count: 82, variant: "warning" },
        "терапевт_first_Филиал 1": { percent: 76, count: 76, variant: "error" },
        "кардиолог_second_Филиал 2": { percent: 84, count: 84, variant: "success" },
    },
    "Ср. назначаемость на прием": {
        "терапевт_all_all": { percent: 89, count: 3.0, variant: "warning" },
        "кардиолог_all_all": { percent: 93, count: 3.3, variant: "success" },
        "терапевт_first_Филиал 1": { percent: 86, count: 2.9, variant: "warning" },
        "кардиолог_second_Филиал 2": { percent: 95, count: 3.4, variant: "success" },
    },
    "Потерянная выручка": {
        "all_all_all": { percent: 20, count: 30456, variant: "error" },
    },
};
