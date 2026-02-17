"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "./MetricCard";
import { useFilters } from "@/context/FiltersContext";

import type { MetricCardData } from "@/app/types/MetricTypes";
import { buildMetricCardData } from "@/app/metric-domain/builders/buildMetricCardData";

// конфиги карточек
import { visitsCardConfig } from "@/app/metric-config/cards/visits.config";
import { averageVisitRevenueCardConfig } from "@/app/metric-config/cards/averageVisitRevenue.config";
import {oukrCardConfig} from "@/app/metric-config/cards/oukr.config";
import {fulfillmentCardConfig} from "@/app/metric-config/cards/fulfillment.config";
import {appointmentfulfillmentCardConfig} from "@/app/metric-config/cards/appointmentFulfillment.config";

// моки данных
import { mockRawCardsData, mockLFL } from "@/app/data/mockMetrics";

export function MetricCardsWrapper() {
    const { filters } = useFilters();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // имитация загрузки при смене фильтров
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 150);
        return () => clearTimeout(timer);
    }, [filters]);

    // Все карточки, которые нужно отрисовать
    const cardConfigs = [
        visitsCardConfig,
        averageVisitRevenueCardConfig,
        oukrCardConfig,
        fulfillmentCardConfig,
        appointmentfulfillmentCardConfig
        // сюда потом добавятся другие карточки
    ];

    // строка выбранных верхних фильтров
    const selectedFiltersKey = `${filters.specialty || "all"}_${
        filters.type || "all"
    }_${filters.branch || "all"}`;

    const cardsData: MetricCardData[] = cardConfigs.map((config) => {
        const rawData = mockRawCardsData[config.title];

        if (!rawData) {
            console.warn(`Нет raw-данных для карточки "${config.title}"`);
            return {
                title: config.title,
                metrics: [],
            };
        }

        return buildMetricCardData(config, rawData, {
            selectedFilters: selectedFiltersKey,
            lflMock: mockLFL,
        });
    });

    return (
        <div className="w-full">
            <div
                className="grid w-full gap-6 auto-rows-fr
      [grid-template-columns:repeat(auto-fit,minmax(440px,1fr))]"
            >
                {cardsData.map((cardData, index) => (
                    <MetricCard
                        key={cardData.title ?? index}
                        cardData={cardData}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
}
