import { ProgressBar } from "@/components/ProgressBar";
import type { Metric } from "@/app/types/MetricTypes";

type MetricBarProps = {
    metric: Metric;
    total?: number;
};

function getVariantByValue(value?: number) {
    if (value == null || Number.isNaN(value)) {
        return "neutral";
    }

    if (value <= 10) {
        return "error";
    }

    if (value <= 70) {
        return "warning";
    }

    return "default";
}

export function MetricBar({ metric, total }: MetricBarProps) {
    const factCount = total
        ? Math.round((metric.value / 100) * total)
        : 0;

    const variant = getVariantByValue(metric.value);

    return (
        <div>
            {total && (
                <div className="flex justify-between text-sm font-medium mb-1">
                    <span>{factCount} шт</span>
                    <span>{total} шт</span>
                </div>
            )}

            <ProgressBar
                value={metric.value}
                label={metric.displayValue ?? `${metric.label} ${metric.value}%`}
                variant={variant}
            />
        </div>
    );
}
