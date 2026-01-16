import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cx } from "@/lib/utils";

const progressBarVariants = tv({
    slots: {
        background: "",
        bar: "",
    },
    variants: {
        variant: {
            default: {
                background: "bg-[#CECECE]",
                bar: "bg-[#3E8319]",
            },
            neutral: {
                background: "bg-[#CECECE]",
                bar: "bg-[#CECECE]",
            },
            warning: {
                background: "bg-[#CECECE]",
                bar: "bg-[#EDB212]",
            },
            error: {
                background: "bg-[#CECECE]",
                bar: "bg-[#C43A3A]",
            },
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export type ProgressBarVariant = VariantProps<typeof progressBarVariants>["variant"];

interface ProgressBarProps
    extends React.HTMLProps<HTMLDivElement>,
        VariantProps<typeof progressBarVariants> {
    value?: number;
    max?: number;
    label?: string;
    showAnimation?: boolean;
    mode?: "progress" | "indicator";
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    (
        { value = 0, max = 100, label, showAnimation = false, variant, mode = "progress", className, ...props },
        ref
    ) => {
        const safeValue = Math.min(max, Math.max(value, 0));
        const { background, bar } = progressBarVariants({ variant });

        const width = mode === "indicator" ? "100%" : `${(safeValue / max) * 100}%`;

        return (
            <div
                ref={ref}
                className={cx("relative w-full", className)}
                role="progressbar"
                aria-label="Progress bar"
                aria-valuenow={mode === "progress" ? safeValue : undefined}
                aria-valuemax={mode === "progress" ? max : undefined}
                {...props}
            >
                {/* Фон */}
                <div className={cx("w-full rounded-full overflow-hidden", background())} style={{ height: 26 }}>
                    <div
                        className={cx("h-full rounded-full", bar(), showAnimation && "transition-all duration-300 ease-in-out")}
                        style={{ width }}
                    />
                </div>

                {/* Текст по центру */}
                {label && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-sm font-medium text-white select-none">{label}</span>
                    </div>
                )}
            </div>
        );
    }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar, progressBarVariants };
export type { ProgressBarProps };
