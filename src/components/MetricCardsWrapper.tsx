"use client";

import { useState, useEffect } from "react";
import { useFilters } from "@/context/FiltersContext";
import { MetricCard } from "./MetricCard";
import { buildMetricCardData } from "@/app/metric-domain/builders/buildMetricCardData";
import type { MetricCardData } from "@/app/types/MetricTypes";

// Импортируем **все конфиги карточек**
import { visitsCardConfig } from "@/app/metric-config/cards/visits.config";
// Позже сюда можно добавить новые карточки:
// import { someOtherCardConfig } from "@/app/metric-config/cards/otherCardConfig";

import { mockRawCardsData, mockLFL } from "@/app/data/mockMetrics";

export function MetricCardsWrapper() {
    const { filters } = useFilters(); // для будущей фильтрации
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 100);
        return () => clearTimeout(timer);
    }, [filters]);

    // Список конфигов карточек
    const cardConfigs = [visitsCardConfig /* , otherCardConfig */];

    // Построение данных через билдeр
    const cardsData: MetricCardData[] = cardConfigs.map((config) => {
        const rawData = mockRawCardsData[config.title];
        return buildMetricCardData(config, rawData, {
            selectedFilters: `${filters.specialty || "all"}_${filters.type || "all"}_${filters.branch || "all"}`,
            lflMock: mockLFL, // можно заменить на реальные мок-данные LFL
        });
    });

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            {cardsData.map((card, index) => (
                <MetricCard key={index} cardData={card} isLoading={isLoading} />
            ))}
        </div>
    );
}
