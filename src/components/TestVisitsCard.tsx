"use client";

import { visitsCardConfig } from "@/app/metric-config/cards/visits.config";
import { buildMetricCardData } from "@/app/metric-domain/builders/buildMetricCardData";
import { mockRawCardsData, mockLFL } from "@/app/data/mockMetrics";
import { MetricCard } from "@/components/MetricCard";

export function TestVisitsCard() {
    const cardData = buildMetricCardData(
        visitsCardConfig,
        mockRawCardsData["Приёмы"],
        {
            selectedFilters: "all_all_all",
            lflMock: mockLFL,
        }
    );

    return (
        <div className="max-w-sm">
            <MetricCard cardData={cardData} />
        </div>
    );
}
