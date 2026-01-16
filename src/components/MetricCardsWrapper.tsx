"use client";

import { useFilters } from "@/context/FiltersContext";
import { MetricCard } from "./MetricCard";
import { mockCardsData, mockLFL } from "@/app/data/mockMetrics";
import { useState, useEffect } from "react";

export function MetricCardsWrapper() {
    const { filters } = useFilters();
    const [isLoading, setIsLoading] = useState(true);

    // имитация загрузки данных (или подгрузка реального API)
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 100); // 100ms skeleton
        return () => clearTimeout(timer);
    }, [filters]);

    const isAllFilters = Object.values(filters).every(v => !v || v === "all");

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            {mockCardsData.map((card, index) => {
                const filterKey = `${filters.specialty || "all"}_${filters.type || "all"}_${filters.branch || "all"}`;
                const secondMetric = card.metrics[1];
                const secondCount = card.total && secondMetric ? Math.round((secondMetric.value / 100) * card.total) : 0;

                const leftFilter = isAllFilters
                    ? {
                        percent: secondMetric?.value ?? 0,
                        count: secondCount,
                        variant: secondMetric?.variant ?? "default",
                    }
                    : mockLFL[card.title]?.[filterKey];

                return (
                    <MetricCard
                        key={index}
                        title={card.title}
                        metrics={card.metrics}
                        total={card.total}
                        leftFilter={leftFilter}
                        isLoading={isLoading}
                    />
                );
            })}
        </div>
    );
}
