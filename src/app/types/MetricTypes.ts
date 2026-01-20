import type { MetricPolarity } from "@/utils/metricPolarity";

export type Metric = {
    label: string;
    value: number;
    displayValue?: string;
    variant?: "default" | "error" | "success" | "warning" | "neutral";

    /**
     * Направление метрики (по умолчанию normal)
     */
    polarity?: MetricPolarity;
};

export type MetricCardData = {
    title: string;
    metrics: Metric[];
    total?: number;
    rightFilterTitle?: string;
    centralValueOnly?: boolean;
    unit?: string;
};
