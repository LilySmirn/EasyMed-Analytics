"use client";

import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar"


export function CardDemo() {
    return (
        <Card className="w-[300px] card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Приёмы
            </h2>
            <div className="flex flex-col gap-4 mt-4 w-full">
                <ProgressBar value={33} label="Факт 33%" variant="error" />
                <ProgressBar value={88} label="Прогноз 88%" variant="default" />
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                Card Content
            </p>
        </Card>
    );
}
