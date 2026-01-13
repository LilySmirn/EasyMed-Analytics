"use client";

import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { MetricBar } from "./MetricBar";
import { MetricFilter } from "./MetricFilter";

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
    const secondMetric = metrics[1];

    const factCount = total
        ? Math.round((firstMetric.value / 100) * total)
        : 0;

    const secondCount =
        total && secondMetric
            ? Math.round((secondMetric.value / 100) * total)
            : 0;

    return (
        <Card className="w-[750px] card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {title}
            </h2>

            <div className="flex flex-col gap-4 w-full">
                {/* Первый прогресс бар */}
                <MetricBar metric={firstMetric} total={total} />

                {/* Второй прогресс бар */}
                {secondMetric && (
                    <ProgressBar
                        mode="indicator"
                        value={secondMetric.value}
                        label={
                            secondMetric.displayValue ??
                            `${secondMetric.label} ${secondMetric.value}%`
                        }
                        variant={secondMetric.variant ?? "default"}
                    />
                )}

                {/* Фильтры */}
                <div className="flex justify-between mt-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <MetricFilter
                        title="LFL (фильтр)"
                        percent={secondMetric?.value ?? 0}
                        count={secondCount}
                        align="left"
                    />
                    <MetricFilter
                        title="План/факт"
                        percent={firstMetric.value - 100}
                        count={factCount - (total ?? 0)}
                        align="right"
                    />
                </div>
            </div>
        </Card>
    );
}
