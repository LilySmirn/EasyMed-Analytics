"use client";

import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { MetricBar } from "./MetricBar";
import { MetricFilter } from "./MetricFilter";
import type { Metric } from "@/app/types/MetricTypes";
import { getVariantByPolarity, type MetricPolarity } from "@/utils/metricPolarity";
import { mapProgressVariantToFilterVariant } from "@/utils/metricVariantMapper";

type MetricCardProps = {
    title: string;
    metrics: Metric[];
    total?: number;
    leftFilter?: {
        percent: number;
        count: number;
    };
    rightFilterTitle?: string;
    isLoading?: boolean;
    centralValueOnly?: boolean; // флаг для карточек вроде ОУКР
    unit?: string; // единица измерения, например "шт", "₽" или ""
};

/**
 * Локальная логика первого прогресс-бара
 * для корректной инверсии цвета в правом фильтре
 */
function getFirstBarProgressVariant(value: number) {
    if (value <= 10) return "indicatorNegative";
    if (value <= 70) return "warning";
    return "indicatorPositive";
}

export function MetricCard({
                               title,
                               metrics,
                               total,
                               leftFilter,
                               rightFilterTitle,
                               isLoading,
                               centralValueOnly = false,
                               unit, // принимаем unit
                           }: MetricCardProps) {
    const firstMetric = metrics[0];
    const secondMetric = metrics[1];

    const showSkeleton = isLoading || !leftFilter;

    /** POLARITY карточки: берём напрямую из LFL-метрики */
    const lflPolarity: MetricPolarity = secondMetric?.polarity ?? "normal";

    /** 1️⃣ Второй прогресс-бар (LFL) */
    const secondProgressVariant = secondMetric
        ? getVariantByPolarity(secondMetric.value, lflPolarity)
        : "indicatorPositive";

    /** 2️⃣ Нижний левый фильтр (LFL-фильтр) */
    const leftFilterVariant = mapProgressVariantToFilterVariant(
        getVariantByPolarity(leftFilter?.percent ?? 0, lflPolarity)
    );

    /** 3️⃣ Нижний правый фильтр (инверсия первого прогресс-бара) */
    const firstBarVariant = getFirstBarProgressVariant(firstMetric.value);
    const rightFilterVariant =
        firstBarVariant === "indicatorPositive"
            ? "error"
            : firstBarVariant === "indicatorNegative"
                ? "success"
                : "warning";

    /** Значения для фильтров */
    const factCount = total && !centralValueOnly
        ? Math.round((firstMetric.value / 100) * total)
        : firstMetric.value;

    const rightFilterCount = total && !centralValueOnly
        ? factCount - (total ?? 0)
        : firstMetric.value;

    return (
        <Card className="w-[750px] card p-6">
            <h2 className="text-[30px] font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
                {title}
            </h2>

            <div className="flex flex-col gap-4 w-full">
                {/* Первый прогресс-бар всегда */}
                <MetricBar
                    metric={firstMetric}
                    total={total}
                    centralValueOnly={centralValueOnly}
                    unit={unit} // передаем единицу измерения
                />

                {/* Второй прогресс-бар — индикатор */}
                {secondMetric && (
                    <ProgressBar
                        mode="indicator"
                        value={100}
                        label={secondMetric.displayValue ?? `${secondMetric.label} ${secondMetric.value}%`}
                        variant={secondProgressVariant}
                    />
                )}

                <div className="flex justify-between mt-4 gap-4 text-sm">
                    {showSkeleton ? (
                        <>
                            <div className="w-[100px] h-6 bg-gray-300 rounded" />
                            <MetricFilter
                                title={rightFilterTitle ?? "План/факт"}
                                percent={firstMetric.value - 100}
                                count={rightFilterCount}
                                align="right"
                                variant={rightFilterVariant}
                            />
                        </>
                    ) : (
                        <>
                            {/* ЛЕВЫЙ — LFL */}
                            <MetricFilter
                                title="LFL (фильтр)"
                                percent={leftFilter?.percent ?? 0}
                                count={leftFilter?.count ?? 0}
                                align="left"
                                variant={leftFilterVariant}
                            />

                            {/* ПРАВЫЙ — План/факт или своё название */}
                            <MetricFilter
                                title={rightFilterTitle ?? "План/факт"}
                                percent={firstMetric.value - 100}
                                count={rightFilterCount}
                                align="right"
                                variant={rightFilterVariant}
                            />
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}
