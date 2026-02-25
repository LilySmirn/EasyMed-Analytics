import { ProgressBar } from "@/components/ProgressBar";
import type { Metric } from "@/app/types/MetricTypes";

type MetricBarProps = {
    metric: Metric;
    total?: number;
    centralValueOnly?: boolean;
    unit?: string; // новая единица
    description?: string;
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
    const centralValue = metric.displayValue ?? (unit ? `${metric.value}${unit === "%" ? "%" : ` ${unit}`}` : `${metric.value}%`);
    const shouldShowProgressBar = !(centralValueOnly && total == null);

    return (
        <div>
            {centralValueOnly ? (
                <div className="text-center font-bold text-[27px] mb-[0.225rem]">{centralValue}</div>
            ) : total ? (
                <div className="flex justify-between font-bold text-[27px] mb-[0.225rem]">
                    <span>{factCount}{unitText}</span>
                    <span>{total}{unitText}</span>
                </div>
            ) : null}

            {shouldShowProgressBar && (
                <ProgressBar
                    value={metric.value}
                    label={metric.displayValue ?? `${metric.label} ${metric.value}%`}
                    variant={variant}
                />
            )}
        </div>
    );
}
