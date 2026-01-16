export type Metric = {
    label: string;
    value: number;
    displayValue?: string;
    variant?: "default" | "error" | "success" | "warning" | "neutral";
};

export type MetricCardData = {
    title: string;
    metrics: Metric[];
    total?: number;
};
