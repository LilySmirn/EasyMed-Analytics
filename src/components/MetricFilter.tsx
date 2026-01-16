// фильтры внизу на карточках

import { BarChart } from "lucide-react";

type MetricFilterProps = {
    title: string;
    percent: number;
    count: number;
    align?: "left" | "right";
    variant?: "default" | "error" | "success" | "warning" | "neutral";
};

export function MetricFilter({ title, percent, count, align = "left", variant = "default" }: MetricFilterProps) {
    // можешь тут использовать variant для цвета текста или иконки
    return (
        <div className={`flex ${align === "left" ? "justify-start" : "justify-end"} w-full`}>
            <div className="flex flex-col items-start">
                <span className="font-medium">{title}</span>
                <div className="flex items-center gap-2 mt-1">
                    <BarChart className="w-4 h-4" />
                    <span>{percent}% ({count})</span>
                </div>
            </div>
        </div>
    );
}
