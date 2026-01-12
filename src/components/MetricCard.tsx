"use client";

import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";

export type Metric = {
    label: string;
    value: number;
    displayValue?: string;
    variant?: "default" | "error";
};

export type MetricCardData = {
    title: string;
    metrics: Metric[];
    total?: number;
};

type MetricCardProps = MetricCardData;

export function MetricCard({ title, metrics, total }: MetricCardProps) {
    const firstMetric = metrics[0];
    const factCount = total ? Math.round((firstMetric.value / 100) * total) : 0;

    return (
        <Card className="w-[750px] card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {title}
            </h2>

            <div className="flex flex-col gap-4 w-full">
                {/* Первый прогресс бар с надписями сверху */}
                <div>
                    {total && (
                        <div className="flex justify-between text-sm font-medium mb-1">
                            <span>{factCount} шт</span>
                            <span>{total} шт</span>
                        </div>
                    )}

                    <ProgressBar
                        value={firstMetric.value}
                        label={firstMetric.displayValue ?? `${firstMetric.label} ${firstMetric.value}%`}
                        variant={firstMetric.variant ?? "default"}
                    />
                </div>

                {/* Остальные прогресс-бары (если есть) */}
                {metrics.slice(1).map((metric, index) => (
                    <ProgressBar
                        key={index}
                        value={metric.value}
                        label={metric.displayValue ?? `${metric.label} ${metric.value}`}
                        variant={metric.variant ?? "default"}
                    />
                ))}
            </div>
        </Card>
    );
}
