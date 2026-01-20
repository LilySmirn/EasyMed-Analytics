import { BarChart } from "lucide-react";

type MetricFilterProps = {
    title: string;
    percent: number;
    count: number;
    align?: "left" | "right";
    variant?: "default" | "error" | "success" | "warning" | "neutral";
};

const valueColorClasses: Record<
    NonNullable<MetricFilterProps["variant"]>,
    string
> = {
    default: "text-gray-700 dark:text-gray-300",
    success: "text-[#66A246]",
    error: "text-[#E86363]",
    warning: "text-yellow-600",
    neutral: "text-gray-500",
};

export function MetricFilter({
                                 title,
                                 percent,
                                 count,
                                 align = "left",
                                 variant = "default",
                             }: MetricFilterProps) {
    const valueColor = valueColorClasses[variant];

    return (
        <div className={`flex ${align === "left" ? "justify-start" : "justify-end"} w-full`}>
            <div className="flex flex-col items-start">
                {/* Заголовок — всегда обычный */}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                    {title}
                </span>

                {/* Значение + иконка — цветные */}
                <div className={`flex items-center gap-2 mt-1 ${valueColor}`}>
                    <BarChart className="w-4 h-4" />
                    <span>
                        {percent}% ({count})
                    </span>
                </div>
            </div>
        </div>
    );
}
