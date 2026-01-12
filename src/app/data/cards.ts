import type { MetricCardData } from "@/components/MetricCard";

export const cardsData: MetricCardData[] =  [
    {
        title: "Приёмы",
        total: 10000,
        metrics: [
            { label: "Факт", value: 33, variant: "error" },
            { label: "LFL (к пред. месяцу)", value: 10, displayValue: "+10%", },
        ],
    },
    {
        title: "Первичные приёмы",
        total: 5000,
        metrics: [
            { label: "Факт", value: 99 },
            { label: "Прогноз", value: 70 },
        ],
    },
];
