// src/app/metric-domain/builders/buildMetricCardData.ts
import type { MetricCardConfig } from "@/app/metric-config/metricCardConfig";
import type { MetricCardData, Metric, MetricFilterData } from "@/app/types/MetricTypes";
import { calcFactPercent } from "../calculators/calcFactPercent";
import { calcLFL } from "../calculators/calcLFL";
import { getVariant } from "../calculators/getVariant";
import { calcRightFilter } from "../calculators/calcRightFilter";

import { getVariantByPolarity } from "@/utils/metricPolarity";

// -------------------- Типы --------------------
export type RawMetricData = {
    factValue: number;
    planValue?: number;
    lflValue?: number;
    description?: string;
};

export interface FiltersState {
    selectedFilters?: string; // ключ фильтров, например "терапевт_all_all"
    lflMock?: Record<
        string,
        Record<
            string,
            { percent: number; count: number }
        >
    >;
}

// -------------------- Универсальный билдeр --------------------
export function buildMetricCardData(
    config: MetricCardConfig,
    rawData: RawMetricData,
    filtersState?: FiltersState
): MetricCardData {
    const metrics: Metric[] = [];

    // --- Факт-бар ---
    if (config.bars.fact?.enabled && rawData.planValue != null) {
        const factPercent = calcFactPercent(rawData.factValue, rawData.planValue);
        const factVariant = getVariant(factPercent, undefined, "normal");
        metrics.push({
            label: "Факт",
            value: factPercent,
            variant: factVariant,
            displayValue: config.factDisplay.valuePosition === "center" ? `${factPercent}%` : undefined,
        });
    }

    // --- LFL-бар ---
    let lflPercent: number | undefined;
    if (config.bars.lfl?.enabled) {
        lflPercent = calcLFL(rawData, filtersState);
        const lflVariant = getVariant(lflPercent, undefined, config.bars.lfl.polarity);
        metrics.push({
            label: "LFL",
            value: lflPercent,
            variant: lflVariant,
        });
    }

    // const lflMetric = metrics.find((m) => m.label === "LFL");

    // --- Левый фильтр ---
    const leftFilter: MetricFilterData | undefined =
        config.filters.left
            ? (() => {
                const cardId = config.title;
                const mockForCard = filtersState?.lflMock?.[cardId];

                // percent берём через calcLFL
                const percent = calcLFL(rawData, {
                    selectedFilters: filtersState?.selectedFilters,
                    lflMock: filtersState?.lflMock,
                    cardTitle: cardId,
                });

                // count для скобок
                let count: number | undefined;
                const selectedKey = filtersState?.selectedFilters ?? "";

                if (config.filters.left.showCount) {
                    if (mockForCard?.[selectedKey]?.count != null) {
                        // выбран конкретный фильтр
                        count = mockForCard[selectedKey].count;
                    } else {
                        // all / ничего не выбрано → пересчитываем абсолютное число по проценту
                        // Например, берём rawData.factValue как базу
                        count = Math.round(rawData.factValue * percent / 100);
                    }
                }

                const leftFilterData: MetricFilterData = {
                    label: config.filters.left.title,
                    value: percent,
                    variant: getVariantByPolarity(percent, config.bars.lfl?.polarity ?? "normal"),
                };

                if (count != null) {
                    leftFilterData.count = count;
                }

                return leftFilterData;
            })()
            : undefined;


    // --- Правый фильтр ---
    const rightFilter: MetricFilterData | undefined =
        config.filters.right?.enabled
            ? (() => {
                const { percent, count } = calcRightFilter(rawData.factValue, rawData.planValue);
                const rightFilterData: MetricFilterData = {
                    label: config.filters.right.title,
                    value: percent,
                    variant: metrics.find((m) => m.label === "Факт")?.variant,
                };

                if (config.filters.right.showCount && count != null) {
                    const normalizedCount =
                        config.title === "Ср. назначаемость на прием"
                            ? Number(count.toFixed(1))
                            : count;

                    rightFilterData.count = normalizedCount;
                }

                return rightFilterData;
            })()
            : undefined;

    const centralValueOnly =
        config.factDisplay.valuePosition === "center" ||
        (config.referenceType === "none" && !config.bars.fact?.enabled);

    return {
        title: config.title,
        metrics,
        total: rawData.planValue,
        rightFilterTitle: rightFilter?.label,
        centralValueOnly,
        unit: config.unit,
        filters: { left: leftFilter, right: rightFilter },
        description: rawData.description,
    };
}
