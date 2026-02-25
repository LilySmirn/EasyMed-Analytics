import type { MetricCardConfig } from "../metricCardConfig";

export const lostRevenueCardConfig: MetricCardConfig = {
    id: "lostRevenue",
    title: "Потерянная выручка",
    unit: "₽",

    referenceType: "none",

    factDisplay: {
        showBar: false,
        valuePosition: "center",
    },

    bars: {
        fact: {
            enabled: false,
        },
        lfl: {
            enabled: true,
            label: "LFL (к пред. месяцу)",
            polarity: "normal",
        },
    },

    filters: {
        left: {
            title: "LFL (фильтр)",
            source: "lfl",
            polarity: "inverted",
            showCount: true,
        },
        right: {
            title: "Процент от выручки",
            enabled: true,
            value: "custom",
            colorSource: "factBar",
            showCount: false,
        },
    },
};
