"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { MetricBar } from "./MetricBar";
import { MetricFilter } from "./MetricFilter";
import { useFilters } from "@/context/FiltersContext";

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
    const totalSafe = total ?? 0;

    const secondCount =
        secondMetric && totalSafe
            ? Math.round((secondMetric.value / 100) * totalSafe)
            : 0;

    const factCount = totalSafe
        ? Math.round((firstMetric.value / 100) * totalSafe)
        : 0;

    const { filters } = useFilters();

    // placeholder для LFL фильтра
    const [leftFilter, setLeftFilter] = useState({ percent: 0, count: 0 });

    useEffect(() => {
        // проверяем, применен ли хотя бы один фильтр (значение != all)
        const isFilterApplied = Object.values(filters).some((v) => v && v !== "all");

        if (!isFilterApplied) {
            // все фильтры на all → берем значения второго прогресс-бара
            setLeftFilter({
                percent: secondMetric?.value ?? 0,
                count: secondCount,
            });
        } else {
            // хотя бы один фильтр выбран → ставим заглушку для активного фильтра
            setLeftFilter({
                percent: 50, // тут подставить реальные значения по фильтрам
                count: 25,   // тоже заглушка
            });
        }
    }, [filters, secondMetric, secondCount]);

    return (
        <Card className="w-[750px] card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {title}
            </h2>

            <div className="flex flex-col gap-4 w-full">
                <MetricBar metric={firstMetric} total={totalSafe} />

                {secondMetric && (
                    <ProgressBar
                        mode="indicator"
                        value={secondMetric.value}
                        label={`${secondMetric.label} ${secondMetric.value}%`}
                        variant={secondMetric.variant ?? "default"}
                    />
                )}

                <div className="flex justify-between mt-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <MetricFilter
                        title="LFL (фильтр)"
                        percent={leftFilter.percent}
                        count={leftFilter.count}
                        align="left"
                    />

                    <MetricFilter
                        title="План/факт"
                        percent={firstMetric.value - 100}
                        count={factCount - totalSafe}
                        align="right"
                    />
                </div>
            </div>
        </Card>
    );
}
