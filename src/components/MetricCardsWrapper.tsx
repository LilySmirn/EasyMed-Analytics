"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "./MetricCard";
import { useRouter } from "next/navigation";
import { useFilters } from "@/context/FiltersContext";

import { buildMetricCardData } from "@/app/metric-domain/builders/buildMetricCardData";

// конфиги карточек
import { visitsCardConfig } from "@/app/metric-config/cards/visits.config";
import { averageVisitRevenueCardConfig } from "@/app/metric-config/cards/averageVisitRevenue.config";
import { oukrCardConfig } from "@/app/metric-config/cards/oukr.config";
import { fulfillmentCardConfig } from "@/app/metric-config/cards/fulfillment.config";
import { appointmentfulfillmentCardConfig } from "@/app/metric-config/cards/appointmentFulfillment.config";
import { lostRevenueCardConfig } from "@/app/metric-config/cards/lostRevenue.config";
import {potentialRevenueCardConfig} from "@/app/metric-config/cards/potentialRevenue.config";
import {revenueCardConfig} from "@/app/metric-config/cards/revenue.config";
import {repeatVisitsCardConfig} from "@/app/metric-config/cards/repeatVisits.config";

// моки данных
import { mockRawCardsData, mockLFL } from "@/app/data/mockMetrics";

export function MetricCardsWrapper() {
    const { filters } = useFilters();
    const router = useRouter();
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
        appointmentfulfillmentCardConfig,
        lostRevenueCardConfig,
        potentialRevenueCardConfig,
        revenueCardConfig,
        repeatVisitsCardConfig,
        // сюда потом добавятся другие карточки
    ];

    // строка выбранных верхних фильтров
    const formatFilterValue = (value: string | string[] | undefined) => (
        Array.isArray(value) ? (value.length > 0 ? value.join("|") : "all") : (value || "all")
    );

    const selectedFiltersKey = `${formatFilterValue(filters.specialty)}_${
        formatFilterValue(filters.type)
    }_${formatFilterValue(filters.branch)}`;

    const cardsData = cardConfigs.map((config) => {
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
                    <div
                        key={cardData.title ?? index}
                        role="button"
                        tabIndex={0}
                        onClick={() => router.push("/nosologies")}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                router.push("/nosologies");
                            }
                        }}
                        className="h-full cursor-pointer transition-transform duration-200 hover:scale-[1.02] focus-visible:scale-[1.02] focus-visible:outline-none"
                        aria-label={`Открыть страницу нозологий: ${cardData.title}`}
                    >
                        <MetricCard cardData={cardData} isLoading={isLoading} />
                    </div>
                ))}
            </div>
        </div>
    );
}
