import { ProgressBar } from "@/components/ProgressBar";
import type { Metric } from "@/app/types/MetricTypes";

type MetricBarProps = {
    metric: Metric;
    total?: number;
    centralValueOnly?: boolean;
    unit?: string; // новая единица
};

function getVariantByValue(value?: number) {
    if (value == null || Number.isNaN(value)) return "neutral";
    if (value <= 79.9) return "error";
    if (value <= 89.9) return "warning";
    return "default";
}

export function MetricBar({ metric, total, centralValueOnly = false, unit }: MetricBarProps) {
    const factCount = total ? Math.round((metric.value / 100) * total) : metric.value;
    const variant = getVariantByValue(metric.value);
    const unitText = unit ? ` ${unit}` : "";

    return (
        <div>
            {centralValueOnly ? (
                <div className="text-center font-bold text-[30px] mb-1">{metric.value}%</div>
            ) : total ? (
                <div className="flex justify-between font-bold text-[30px] mb-1">
                    <span>{factCount}{unitText}</span>
                    <span>{total}{unitText}</span>
                </div>
            ) : null}

            <ProgressBar
                value={metric.value}
                label={metric.displayValue ?? `${metric.label} ${metric.value}%`}
                variant={variant}
            />
        </div>
    );
}
