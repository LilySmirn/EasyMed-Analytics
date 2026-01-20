import type { ProgressBarVariant } from "@/components/ProgressBar";

export type MetricFilterVariant =
    | "default"
    | "error"
    | "success"
    | "warning"
    | "neutral";

export function mapProgressVariantToFilterVariant(
    variant: ProgressBarVariant
): MetricFilterVariant {
    switch (variant) {
        case "indicatorPositive":
            return "success";
        case "indicatorNegative":
            return "error";
        default:
            return "default";
    }
}
