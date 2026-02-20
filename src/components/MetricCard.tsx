"use client";

import { Card } from "@/components/Card";
import { MetricBar } from "./MetricBar";
import { ProgressBar } from "./ProgressBar";
import { MetricFilter } from "./MetricFilter";
import type { MetricCardData } from "@/app/types/MetricTypes";
import { Tooltip } from "@/components/Tooltip";

type MetricCardProps = {
    cardData: MetricCardData;
    isLoading?: boolean;
};

export function MetricCard({ cardData, isLoading }: MetricCardProps) {
    const { title, metrics, total, filters, centralValueOnly, unit, description } = cardData;

    const factMetric = metrics[0];
    const lflMetric = metrics[1];

    const showSkeleton = isLoading || !filters?.left;

    // --- вынесем фильтры в отдельные переменные, чтобы TS понял, что они могут быть undefined
    const leftFilter = filters?.left;
    const rightFilter = filters?.right;

    return (
        <Card className="w-full h-full p-[1.2rem] flex flex-col">

            {description && (
                <div className="absolute top-[0.75rem] right-[0.75rem]">
                    <Tooltip content={description} side="top" showArrow asChild>
                        <button
                            type="button"
                            aria-label="Описание метрики"
                            className="
                w-6 h-6 rounded-full border border-gray-200 bg-white/90
                text-gray-600 hover:text-gray-900 hover:bg-white
                flex items-center justify-center text-[12px] font-semibold leading-none
                shadow-sm
                cursor-pointer
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
              "
                            onClick={(e) => e.stopPropagation()}
                        >
                            ?
                        </button>
                    </Tooltip>
                </div>
            )}

            <h2 className="text-[24px] font-bold text-center mb-[0.8rem]">{title}</h2>

            <div className="flex flex-col gap-[0.8rem]">
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
                <div className="flex justify-between mt-[0.8rem] gap-[0.8rem] text-[0.79rem]">
                    {showSkeleton ? (
                        <>␊
                        <div className="w-[96px] h-[1.2rem] bg-gray-300 rounded" />
                        <div className="w-[96px] h-[1.2rem] bg-gray-300 rounded" />
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
