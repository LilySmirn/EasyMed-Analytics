// src/app/data/mockMetrics.ts
import type { MetricCardData } from "@/app/types/MetricTypes";

// Основные карточки
export const mockCardsData: MetricCardData[] = [
    {
        title: "Приёмы",
        metrics: [
            { label: "Факт", value: 33, variant: "default" },

            // LFL: error = плохо (красный)
            {
                label: "LFL (к пред. месяцу)",
                value: +10,
                variant: "error",
                polarity: "normal",
            },
        ],
        total: 10000,
        rightFilterTitle: "План/факт",
        unit: "",
    },
    {
        title: "Ср.чек приема",
        metrics: [
            { label: "Факт", value: 83, variant: "default" },

            // LFL: error = плохо
            {
                label: "LFL (к пред. месяцу)",
                value: -17,
                variant: "error",
                polarity: "normal",
            },
        ],
        total: 5000,
        rightFilterTitle: "План/факт",
        unit: "₽",
    },
    {
        title: "Соблюдение ОУКР",
        metrics: [
            { label: "План", value: 93, variant: "default" },

            // пример, когда значение большое,
            // но считается хорошим
            {
                label: "LFL (к пред. месяцу)",
                value: -5,
                variant: "error",
                polarity: "inverted",
            },
        ],
        total: 180,
        rightFilterTitle: "Отклонение от ОУКР",
        centralValueOnly: true,
        unit: "",
    },
];

// mock LFL для каждой карточки в зависимости от комбинации фильтров
export const mockLFL: Record<
    string,
    Record<
        string,
        {
            percent: number;
            count: number;
            variant?: "default" | "error";
        }
    >
> = {
    "Приёмы": {
        "терапевт_all_all": {
            percent: -10,
            count: 12,
            variant: "default", // хорошо
        },
        "кардиолог_all_all": {
            percent: -35,
            count: 15,
            variant: "error", // плохо
        },
        "терапевт_first_Филиал 1": {
            percent: 45,
            count: 20,
            variant: "default",
        },
        "кардиолог_second_Филиал 2": {
            percent: 50,
            count: 22,
            variant: "error",
        },
    },
    "Ср.чек приема": {
        "терапевт_all_all": {
            percent: 30,
            count: 15,
            variant: "default",
        },
        "кардиолог_all_all": {
            percent: 40,
            count: 18,
            variant: "error",
        },
        "терапевт_first_Филиал 1": {
            percent: 55,
            count: 23,
            variant: "default",
        },
        "кардиолог_second_Филиал 2": {
            percent: 60,
            count: 25,
            variant: "error",
        },
    },
    "Соблюдение ОУКР": {
        "терапевт_all_all": {
            percent: 28,
            count: 14,
            variant: "default",
        },
        "кардиолог_all_all": {
            percent: 38,
            count: 17,
            variant: "error",
        },
        "терапевт_first_Филиал 3": {
            percent: 48,
            count: 21,
            variant: "default",
        },
        "кардиолог_second_Филиал 1": {
            percent: 52,
            count: 24,
            variant: "error",
        },
    },
};
