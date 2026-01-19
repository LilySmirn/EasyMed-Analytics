"use client";

import { Card } from "@/components/Card";
import { ProgressBar, type ProgressBarVariant } from "@/components/ProgressBar";
import { MetricBar } from "./MetricBar";
import { MetricFilter } from "./MetricFilter";
import type { Metric } from "@/app/types/MetricTypes";

/**
 * Варианты ТОЛЬКО для MetricFilter (нижние фильтры),
 * они НЕ знают про indicatorPositive / indicatorNegative
 */
type MetricFilterVariant =
    | "default"
    | "error"
    | "success"
    | "warning"
    | "neutral";

type MetricCardProps = {
    title: string;
    metrics: Metric[];
    total?: number;
    leftFilter?: {
        percent: number;
        count: number;
        variant?: MetricFilterVariant;
    };
    isLoading?: boolean;
};

export function MetricCard({
                               title,
                               metrics,
                               total,
                               leftFilter,
                               isLoading,
                           }: MetricCardProps) {
    const firstMetric = metrics[0];
    const secondMetric = metrics[1];

    const factCount = total
        ? Math.round((firstMetric.value / 100) * total)
        : 0;

    const secondCount =
        secondMetric && typeof total === "number"
            ? Math.round((secondMetric.value / 100) * total)
            : 0;

    const showSkeleton = isLoading || !leftFilter;

    /**
     * Второй прогресс-бар (LFL)
     * Цвет определяется бизнес-логикой, а не значением
     */
    const secondVariant: ProgressBarVariant =
        secondMetric?.isPositive
            ? "indicatorPositive"
            : "indicatorNegative";

    return (
        <Card className="w-[750px] card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {title}
            </h2>

            <div className="flex flex-col gap-4 w-full">
                {/* Первый прогресс-бар — без изменений */}
                <MetricBar metric={firstMetric} total={total} />

                {/* Второй прогресс-бар — индикатор */}
                {secondMetric && (
                    <ProgressBar
                        mode="indicator"
                        value={100}
                        label={
                            secondMetric.displayValue ??
                            `${secondMetric.label} ${secondMetric.value}%`
                        }
                        variant={secondVariant}
                    />
                )}

                <div className="flex justify-between mt-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    {showSkeleton ? (
                        <>
                            <div className="w-[100px] h-6 bg-gray-300 rounded" />
                            <MetricFilter
                                title="План/факт"
                                percent={firstMetric.value - 100}
                                count={factCount - (total ?? 0)}
                                align="right"
                            />
                        </>
                    ) : (
                        <>
                            <MetricFilter
                                title="LFL (фильтр)"
                                percent={leftFilter?.percent ?? secondCount}
                                count={leftFilter?.count ?? secondCount}
                                align="left"
                                variant={leftFilter?.variant ?? "default"}
                            />
                            <MetricFilter
                                title="План/факт"
                                percent={firstMetric.value - 100}
                                count={factCount - (total ?? 0)}
                                align="right"
                            />
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}
