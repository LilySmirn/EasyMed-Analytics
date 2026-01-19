export type Metric = {
    label: string;
    value: number;
    displayValue?: string;
    variant?: "default" | "error" | "success" | "warning" | "neutral";

    /**
     * Используется ТОЛЬКО для индикаторного прогресс-бара (LFL).
     * true  → зелёный (#66A246)
     * false → красный (#E86363)
     */
    isPositive?: boolean;
};

export type MetricCardData = {
    title: string;
    metrics: Metric[];
    total?: number;
};
