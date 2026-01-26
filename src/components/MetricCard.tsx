"use client";

import { Card } from "@/components/Card";
import { MetricBar } from "./MetricBar";
import { ProgressBar } from "./ProgressBar";
import { MetricFilter } from "./MetricFilter";
import type { MetricCardData } from "@/app/types/MetricTypes";

type MetricCardProps = {
    cardData: MetricCardData;
    isLoading?: boolean;
};

export function MetricCard({ cardData, isLoading }: MetricCardProps) {
    const { title, metrics, total, filters, centralValueOnly, unit } = cardData;

    const factMetric = metrics[0];
    const lflMetric = metrics[1];

    const showSkeleton = isLoading || !filters?.left;

    // --- вынесем фильтры в отдельные переменные, чтобы TS понял, что они могут быть undefined
    const leftFilter = filters?.left;
    const rightFilter = filters?.right;

    return (
        <Card className="w-[750px] p-6">
            <h2 className="text-[30px] font-bold text-center mb-4">{title}</h2>

            <div className="flex flex-col gap-4">
                {/* FACT BAR */}
                {factMetric && (
                    <MetricBar
                        metric={factMetric}
                        total={total}
                        centralValueOnly={centralValueOnly}
                        unit={unit}
                    />
                )}

                {/* LFL BAR */}
                {lflMetric && (
                    <ProgressBar
                        mode="indicator"
                        value={100}
                        label={`${lflMetric.label} ${lflMetric.value}%`}
                        variant={lflMetric.variant} // используем variant из билдера
                    />
                )}

                {/* FILTERS */}
                <div className="flex justify-between mt-4 gap-4 text-sm">
                    {showSkeleton ? (
                        <>
                            <div className="w-[120px] h-6 bg-gray-300 rounded" />
                            <div className="w-[120px] h-6 bg-gray-300 rounded" />
                        </>
                    ) : (
                        <>
                            {leftFilter && (
                                <MetricFilter
                                    title={leftFilter.label}
                                    percent={leftFilter.value}
                                    count={leftFilter.count ?? 0} // дефолт 0
                                    variant={leftFilter.variant}
                                    align="left"
                                />
                            )}

                            {rightFilter && (
                                <MetricFilter
                                    title={rightFilter.label}
                                    percent={rightFilter.value}
                                    count={rightFilter.count ?? 0} // дефолт 0
                                    variant={rightFilter.variant}
                                    align="right"
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}
