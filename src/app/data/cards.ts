import type { MetricCardData } from "@/components/MetricCard";

export const cardsData: MetricCardData[] =  [
    {
        title: "Приёмы",
        metrics: [
            { label: "Факт", value: 33, variant: "error" },
            { label: "Прогноз", value: 88 },
        ],
    },
    {
        title: "Первичные приёмы",
        metrics: [
            { label: "Факт", value: 45 },
            { label: "Прогноз", value: 70 },
        ],
    },
    {
        title: "Повторные приёмы",
        metrics: [
            { label: "Шт", value: 60 },
            { label: "Процент", value: 75 },
        ],
    },
    {
        title: "Соблюдение КР",
        metrics: [
            { label: "Шт", value: 60 },
            { label: "Процент", value: 75 },
        ],
    },
    {
        title: "Назначено сверх КР",
        metrics: [
            { label: "Шт", value: 60 },
            { label: "Процент", value: 75 },
        ],
    },
    {
        title: "Назначено всего услуг",
        metrics: [
            { label: "Шт", value: 60 },
            { label: "Процент", value: 75 },
        ],
    },
    {
        title: "Среднее Назначено на 1 приём",
        metrics: [
            { label: "Шт", value: 60 },
            { label: "Процент", value: 75 },
        ],
    },
    {
        title: "Приемов без назначений",
        metrics: [
            { label: "Шт", value: 60 },
            { label: "Процент", value: 75 },
        ],
    },
    {
        title: "Процент выполнения",
        metrics: [
            { label: "Шт", value: 60 },
            { label: "Процент", value: 75 },
        ],
    },
    {
        title: "Средний чек",
        metrics: [
            { label: "Факт", value: 82 },
        ],
    },
    {
        title: "Выручка",
        metrics: [
            { label: "Факт", value: 90 },
        ],
    },
    {
        title: "Потерянная выручка",
        metrics: [
            { label: "Факт", value: 25, variant: "error" },
        ],
    },
];
