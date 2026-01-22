import type { MetricCardConfig } from "../metricCardConfig";
import type { MetricPolarity } from "@/./utils/metricPolarity";

export const visitsCardConfig: MetricCardConfig = {
    id: "visits",
    title: "Приёмы",
    unit: "шт",

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
        },
        right: {
            title: "План/факт",
            enabled: true,
            value: "100minusFact",
            colorSource: "factBar",
        },
    },
};
