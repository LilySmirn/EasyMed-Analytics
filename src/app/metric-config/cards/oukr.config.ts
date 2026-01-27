import type { MetricCardConfig } from "../metricCardConfig";

export const oukrCardConfig: MetricCardConfig = {
    id: "oukr",
    title: "Соблюдение ОУКР",
    unit: "%",

    /**
     * Карточка поддерживает план
     * (если плана нет в данных — он просто не будет показан)
     */
    referenceType: "ideal",

    factDisplay: {
        showBar: true,
        valuePosition: "center",
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
            polarity: "inverted",
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
