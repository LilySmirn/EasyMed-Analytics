"use client";

import { MetricCard } from "./MetricCard";
import { cardsData } from "@/app/data/cards";

export function MetricCardsWrapper() {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            {cardsData.map((card, index) => (
                <MetricCard
                    key={index}
                    title={card.title}
                    metrics={card.metrics}
                    total={card.total}
                />
            ))}
        </div>
    );
}
