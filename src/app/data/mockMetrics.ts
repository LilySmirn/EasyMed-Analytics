// src/app/data/mockMetrics.ts
import type { MetricCardData } from "@/app/types/MetricTypes";

// Основные карточки
export const mockCardsData: MetricCardData[] = [
    {
        title: "Карточка 1",
        metrics: [
            { label: "План", value: 50, variant: "default" },

            // 🔹 LFL: error = плохо (красный)
            {
                label: "LFL (к пред. месяцу)",
                value: 90,
                variant: "error",
                isPositive: false,
            },
        ],
        total: 200,
    },
    {
        title: "Карточка 2",
        metrics: [
            { label: "План", value: 90, variant: "default" },

            // 🔹 LFL: error = плохо
            {
                label: "LFL (к пред. месяцу)",
                value: 70,
                variant: "error",
                isPositive: false,
            },
        ],
        total: 150,
    },
    {
        title: "Карточка 3",
        metrics: [
            { label: "План", value: 10, variant: "default" },

            // 🔹 пример, когда значение большое,
            // но считается хорошим
            {
                label: "LFL (к пред. месяцу)",
                value: 85,
                variant: "error",
                isPositive: true,
            },
        ],
        total: 180,
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
    "Карточка 1": {
        "терапевт_all_all": {
            percent: 25,
            count: 12,
            variant: "default", // хорошо
        },
        "кардиолог_all_all": {
            percent: 35,
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
    "Карточка 2": {
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
    "Карточка 3": {
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
