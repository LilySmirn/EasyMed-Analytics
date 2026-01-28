import type { MetricCardConfig } from "../metricCardConfig";

export const appointmentfulfillmentCardConfig: MetricCardConfig = {
    id: "appointmentfulfillment",
    title: "Ср. назначаемость на прием",
    unit: "",

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
            polarity: "normal",
        },
    },

    filters: {
        left: {
            title: "LFL (фильтр)",
            source: "lfl",
            polarity: "normal",
            showCount: false,
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
