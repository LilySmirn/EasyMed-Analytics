export type Metric = {
    label: string;
    value: number;
    displayValue?: string;
    variant?: "default" | "error" | "success" | "warning" | "neutral";
};
