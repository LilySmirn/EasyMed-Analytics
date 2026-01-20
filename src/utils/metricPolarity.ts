import type { ProgressBarVariant } from "@/components/ProgressBar";

export type MetricPolarity = "normal" | "inverted";

export function getVariantByPolarity(
    value: number,
    polarity: MetricPolarity
): ProgressBarVariant {
    const isPositive = value >= 0;

    if (polarity === "normal") {
        return isPositive ? "indicatorPositive" : "indicatorNegative";
    }

    // inverted
    return isPositive ? "indicatorNegative" : "indicatorPositive";
}
