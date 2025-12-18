"use client";

import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";

export type Metric = {
    label: string;
    value: number;
    variant?: "default" | "error";
};

export type MetricCardData = {
    title: string;
    metrics: Metric[];
};

type MetricCardProps = MetricCardData;

export function MetricCard({ title, metrics }: MetricCardProps) {
    return (
        <Card className="w-[750px] card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h2>

            <div className="flex flex-col gap-4 mt-4 w-full">
                {metrics.map((metric, index) => (
                    <ProgressBar
                        key={index}
                        value={metric.value}
                        label={`${metric.label} ${metric.value}%`}
                        variant={metric.variant ?? "default"}
                    />
                ))}
            </div>
        </Card>
    );
}
