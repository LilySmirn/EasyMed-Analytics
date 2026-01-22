// Считает левый фильтр / LFL с учётом выбранных фильтров из шапки

import type { RawMetricData } from "@/app/metric-domain/builders/buildMetricCardData";

interface LFLOptions {
    selectedFilters?: string; // ключ комбинации фильтров, например "терапевт_all_all"
    lflMock?: Record<string, Record<string, { percent: number }>>; // mockLFL
    cardTitle?: string;
}

export function calcLFL(rawData: RawMetricData, options?: LFLOptions): number {
    const { selectedFilters, lflMock, cardTitle } = options || {};

    if (selectedFilters && lflMock && cardTitle) {
        const cardLFL = lflMock[cardTitle]?.[selectedFilters];
        if (cardLFL) return cardLFL.percent;
    }

    // Если фильтры не выбраны или моков нет, возвращаем исходное значение
    return rawData.lflValue ?? 0;
}
