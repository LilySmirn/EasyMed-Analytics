// src/app/types/MetricTypes.ts
import type { MetricPolarity } from "@/utils/metricPolarity";
import type { ProgressBarVariant } from "@/components/ProgressBar";

export type Metric = {
    label: string;
    value: number;
    displayValue?: string;
    variant?: "default" | "error" | "success" | "warning" | "neutral";
    polarity?: MetricPolarity;
};

// Для фильтров
export type MetricFilterData = {
    label: string;
    value: number;
    count?: number;
    countDisplay?: string;
    variant?: ProgressBarVariant;
};

export type MetricCardData = {
    title: string;
    metrics: Metric[];
    total?: number;
    rightFilterTitle?: string;
    centralValueOnly?: boolean;
    unit?: string;
    filters?: {
        left?: MetricFilterData;
        right?: MetricFilterData;
    };
    description?: string;
};
