// src/utils/metricPolarity.ts
import type { ProgressBarVariant } from "@/components/ProgressBar";

export type MetricPolarity = "normal" | "inverted";

export function getVariantByPolarity(
    value: number,
    polarity: MetricPolarity
): ProgressBarVariant {
    let variant: "indicatorPositive" | "indicatorNegative" | "indicatorWarning";

    if (value < 80) variant = "indicatorNegative";
    else if (value < 90) variant = "indicatorWarning";
    else variant = "indicatorPositive";

    if (polarity === "inverted") {
        if (variant === "indicatorPositive") variant = "indicatorNegative";
        else if (variant === "indicatorNegative") variant = "indicatorPositive";
        // warning оставляем
    }

    // Маппинг на ProgressBarVariant
    switch (variant) {
        case "indicatorPositive":
            return "success";
        case "indicatorNegative":
            return "error";
        case "indicatorWarning":
            return "warning";
    }
}
