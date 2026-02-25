import type { MetricCardConfig } from "../metricCardConfig";

export const revenueCardConfig: MetricCardConfig = {
    id: "revenue",
    title: "Выручка",
    unit: "млн",

    /**
     * Карточка поддерживает план
     * (если плана нет в данных — он просто не будет показан)
     */
    referenceType: "plan",

    factDisplay: {
        showBar: true,
        valuePosition: "aboveBar",
    },

    bars: {
        fact: {
            enabled: true,
        },
        lfl: {
            enabled: true,
            polarity: "inverted",
        },
    },

    filters: {
        left: {
            title: "LFL (фильтр)",
            source: "lfl",
            polarity: "normal",
            showCount: true,
        },
        right: {
            title: "План/факт",
            enabled: true,
            value: "100minusFact",
            colorSource: "factBar",
            showCount: true,
        },
    },
};
