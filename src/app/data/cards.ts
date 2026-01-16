import type { MetricCardData } from "@/app/types/MetricTypes";

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
        title: "Ср.чек прием",
        total: 5000,
        metrics: [
            { label: "Факт", value: 73, variant: "error" },
            { label: "LFL (к пред. месяцу)", value: 17, displayValue: "-17%", },
        ],
    },
];

// TODO:
// LFL будет вынесен из массива metrics
// и перестанет быть "вторым элементом"
