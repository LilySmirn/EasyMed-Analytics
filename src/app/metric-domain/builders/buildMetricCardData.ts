// src/app/metric-domain/builders/buildMetricCardData.ts
import type { MetricCardConfig } from "@/app/metric-config/metricCardConfig";
import type { MetricCardData, Metric, MetricFilterData } from "@/app/types/MetricTypes";
import { calcFactPercent } from "../calculators/calcFactPercent";
import { calcLFL } from "../calculators/calcLFL";
import { getVariant, Thresholds } from "../calculators/getVariant";
import { calcRightFilter } from "../calculators/calcRightFilter";

// -------------------- Типы --------------------
export type RawMetricData = {
    factValue: number;
    planValue?: number;
    lflValue?: number;
};

export interface FiltersState {
    selectedFilters?: string; // ключ фильтров, например "терапевт_all_all"
    lflMock?: Record<
        string,
        Record<
            string,
            { percent: number; count: number; variant?: "default" | "error" | "success" | "warning" }
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

    // --- 1️⃣ Факт-бар ---
    let factPercent: number | undefined;
    let factVariant: Metric["variant"] | undefined;

    if (config.bars.fact?.enabled && rawData.planValue != null) {
        factPercent = calcFactPercent(rawData.factValue, rawData.planValue);
        factVariant = getVariant(factPercent, undefined, "normal"); // thresholds можно добавить, если нужно
        metrics.push({
            label: "Факт",
            value: factPercent,
            variant: factVariant,
            displayValue:
                config.factDisplay.valuePosition === "center"
                    ? `${factPercent}%`
                    : undefined,
        });
    }

    // --- 2️⃣ LFL-бар ---
    if (config.bars.lfl?.enabled) {
        const lflPercent = calcLFL(rawData, filtersState);
        const lflVariant = getVariant(lflPercent, undefined, config.bars.lfl.polarity);
        metrics.push({
            label: "LFL",
            value: lflPercent,
            variant: lflVariant,
        });
    }

    // --- 3️⃣ Нижние фильтры ---
    const leftFilter: MetricFilterData | undefined = config.filters.left
        ? (() => {
            // Берём значение LFL из моков, если выбран фильтр, иначе дублируем LFL-метрику
            let value = metrics.find((m) => m.label === "LFL")?.value ?? 0;
            let count = 0;
            let variant = metrics.find((m) => m.label === "LFL")?.variant;

            if (filtersState?.selectedFilters && filtersState.lflMock) {
                const mock =
                    filtersState.lflMock[config.title]?.[filtersState.selectedFilters];
                if (mock) {
                    value = mock.percent;
                    count = mock.count;
                    variant = mock.variant;
                }
            }

            return {
                label: config.filters.left.title,
                value,
                count,
                variant,
            };
        })()
        : undefined;

    const rightFilter: MetricFilterData | undefined =
        config.filters.right?.enabled && rawData.planValue != null
            ? {
                label: config.filters.right.title,
                value: 100 - ((rawData.factValue / rawData.planValue) * 100), // % оставшегося
                count: rawData.planValue - rawData.factValue, // абсолютное значение
                variant: metrics.find((m) => m.label === "Факт")?.variant,
            }
            : undefined;

    // --- 4️⃣ centralValueOnly ---
    const centralValueOnly =
        config.factDisplay.valuePosition === "center" ||
        (config.referenceType === "none" && !config.bars.fact?.enabled);

    // --- 5️⃣ Формируем финальный объект ---
    return {
        title: config.title,
        metrics,
        total: rawData.planValue,
        rightFilterTitle: rightFilter?.label,
        centralValueOnly,
        unit: config.unit,
        filters: { left: leftFilter, right: rightFilter },
    };
}
