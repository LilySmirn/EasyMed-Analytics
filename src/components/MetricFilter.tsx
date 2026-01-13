// фильтры внизу на карточках

import { BarChart } from "lucide-react";

type MetricFilterProps = {
    title: string;
    percent: number;
    count: number;
    align?: "left" | "right";
};

export function MetricFilter({
                                 title,
                                 percent,
                                 count,
                                 align = "left",
                             }: MetricFilterProps) {
    return (
        <div
            className={`flex ${
                align === "left" ? "justify-start" : "justify-end"
            } w-full`}
        >
            <div className="flex flex-col items-start">
                {/* Заголовок */}
                <span className="font-medium">{title}</span>

                {/* Иконка + значение */}
                <div className="flex items-center gap-2 mt-1">
                    <BarChart className="w-4 h-4" />
                    <span>
            {percent}% ({count})
          </span>
                </div>
            </div>
        </div>
    );
}
