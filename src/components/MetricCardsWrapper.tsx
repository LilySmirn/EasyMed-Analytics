"use client";

import { useFilters } from "@/context/FiltersContext";
import { MetricCard } from "./MetricCard";
import { mockCardsData, mockLFL } from "@/app/data/mockMetrics";

export function MetricCardsWrapper() {
    const { filters } = useFilters();

    // проверяем, все ли фильтры на "all"
    const isAllFilters = Object.values(filters).every(v => !v || v === "all");

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            {mockCardsData.map((card, index) => {
                // ключ для поиска mock
                const filterKey = `${filters.specialty || "all"}_${filters.type || "all"}_${filters.branch || "all"}`;

                // сначала значения второго прогресс-бара
                const secondMetric = card.metrics[1];
                const secondCount = card.total && secondMetric ? Math.round((secondMetric.value / 100) * card.total) : 0;

                const firstFilter = isAllFilters
                    ? {
                        percent: secondMetric?.value ?? 0,
                        count: secondCount,
                        variant: secondMetric?.variant ?? "default",
                    }
                    : mockLFL[card.title]?.[filterKey]; // берём mock, если фильтр применён

                return (
                    <MetricCard
                        key={index}
                        title={card.title}
                        metrics={card.metrics}
                        total={card.total}
                        leftFilter={firstFilter} // индивидуально для каждой карточки
                    />
                );
            })}
        </div>
    );
}
