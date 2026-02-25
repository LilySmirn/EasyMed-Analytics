import { BarChart } from "lucide-react";
import type { MetricFilterData } from "@/app/types/MetricTypes";

type MetricFilterProps = {
    title: string;
    percent: number;
    count?: number; // optional
    countDisplay?: string;
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
                                 countDisplay,
                                 align = "left",
                                 variant = "default", // default безопасно
                             }: MetricFilterProps) {
    // fallback на default, если variant undefined
    const valueColor = valueColorClasses[(variant ?? "default") as VariantKey];
    const signedPercent = title.includes("LFL") && percent > 0 ? `+${percent}` : `${percent}`;

    return (
        <div className={`flex ${align === "left" ? "justify-start" : "justify-end"} w-full`}>
            <div className="flex flex-col items-start">
                <span className="font-medium text-[0.8rem] text-gray-900 dark:text-gray-100">{title}</span>
                <div className={`flex items-center gap-[0.45rem] mt-[0.225rem] text-[0.8rem] ${valueColor}`}>
                    <BarChart className="w-[0.9rem] h-[0.9rem]" />
                    <span>
                        {signedPercent}%{(countDisplay || (count != null && count > 0 ? ` (${count})` : ""))}
                    </span>
                </div>
            </div>
        </div>
    );
}
