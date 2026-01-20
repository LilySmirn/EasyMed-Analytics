"use client";

import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { MetricBar } from "./MetricBar";
import { MetricFilter } from "./MetricFilter";
import type { Metric } from "@/app/types/MetricTypes";
import {
    getVariantByPolarity,
    type MetricPolarity,
} from "@/utils/metricPolarity";
import {
    mapProgressVariantToFilterVariant,
} from "@/utils/metricVariantMapper";

type MetricCardProps = {
    title: string;
    metrics: Metric[];
    total?: number;
    leftFilter?: {
        percent: number;
        count: number;
    };
    isLoading?: boolean;
};

/**
 * ЛОКАЛЬНО повторяем логику первого прогресс-бара,
 * чтобы корректно инвертировать цвет в правом фильтре
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
                               isLoading,
                           }: MetricCardProps) {
    const firstMetric = metrics[0];
    const secondMetric = metrics[1];

    const factCount = total
        ? Math.round((firstMetric.value / 100) * total)
        : 0;

    const showSkeleton = isLoading || !leftFilter;

    /**
     * POLARITY карточки
     * Берём напрямую из LFL-метрики
     */
    const lflPolarity: MetricPolarity =
        secondMetric?.polarity ?? "normal";

    /**
     * === ВАРИАНТЫ ===
     */

        // 1️⃣ Второй прогресс-бар (LFL)
    const secondProgressVariant = getVariantByPolarity(
            secondMetric.value,
            lflPolarity
        );

    // 2️⃣ Нижний левый фильтр (LFL-фильтр)
    const leftFilterVariant = mapProgressVariantToFilterVariant(
        getVariantByPolarity(leftFilter!.percent, lflPolarity)
    );

    // 3️⃣ Нижний правый фильтр (План/факт)
// инверсия фактического цвета первого прогресс-бара
    const firstBarVariant = getFirstBarProgressVariant(firstMetric.value);

    let rightFilterVariant: "success" | "error" | "warning" = "success";

    if (firstBarVariant === "indicatorPositive") {
        rightFilterVariant = "error"; // инвертируем зеленый → красный
    } else if (firstBarVariant === "indicatorNegative") {
        rightFilterVariant = "success"; // инвертируем красный → зеленый
    } else if (firstBarVariant === "warning") {
        rightFilterVariant = "warning"; // желтый оставляем желтым
    }

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
                        variant={secondProgressVariant}
                    />
                )}

                <div className="flex justify-between mt-4 gap-4 text-sm">
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
                            {/* ЛЕВЫЙ — LFL */}
                            <MetricFilter
                                title="LFL (фильтр)"
                                percent={leftFilter!.percent}
                                count={leftFilter!.count}
                                align="left"
                                variant={leftFilterVariant}
                            />

                            {/* ПРАВЫЙ — План/факт (инверсия первого бара) */}
                            <MetricFilter
                                title="План/факт"
                                percent={firstMetric.value - 100}
                                count={factCount - (total ?? 0)}
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
