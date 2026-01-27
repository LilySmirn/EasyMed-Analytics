import { BarChart } from "lucide-react";
import type { MetricFilterData } from "@/app/types/MetricTypes";

type MetricFilterProps = {
    title: string;
    percent: number;
    count?: number; // optional
    align?: "left" | "right";
    variant?: MetricFilterData["variant"];
};

// ✅ Явный тип без undefined
type VariantKey = "default" | "success" | "error" | "warning" | "neutral";

const valueColorClasses: Record<VariantKey, string> = {
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
                                 variant = "default", // default безопасно
                             }: MetricFilterProps) {
    // fallback на default, если variant undefined
    const valueColor = valueColorClasses[(variant ?? "default") as VariantKey];

    return (
        <div className={`flex ${align === "left" ? "justify-start" : "justify-end"} w-full`}>
            <div className="flex flex-col items-start">
                <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
                <div className={`flex items-center gap-2 mt-1 ${valueColor}`}>
                    <BarChart className="w-4 h-4" />
                    <span>
                        {percent}%{count != null && count > 0 ? ` (${count})` : ""}
                    </span>
                </div>
            </div>
        </div>
    );
}
