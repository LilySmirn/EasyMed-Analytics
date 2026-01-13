import { ProgressBar } from "@/components/ProgressBar";
import type { Metric } from "./MetricCard";

type MetricBarProps = {
    metric: Metric;
    total?: number;
};

export function MetricBar({ metric, total }: MetricBarProps) {
    const factCount = total
        ? Math.round((metric.value / 100) * total)
        : 0;

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
                variant={metric.variant ?? "default"}
            />
        </div>
    );
}
