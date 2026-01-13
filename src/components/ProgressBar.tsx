// Tremor ProgressBar [v0.0.4]

import React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cx } from "@/lib/utils"

const progressBarVariants = tv({
    slots: {
        background: "",
        bar: "",
    },
    variants: {
        variant: {
            default: {
                background: "bg-blue-200 dark:bg-blue-500/30",
                bar: "bg-blue-500 dark:bg-blue-500",
            },
            neutral: {
                background: "bg-gray-200 dark:bg-gray-500/40",
                bar: "bg-gray-500 dark:bg-gray-500",
            },
            warning: {
                background: "bg-yellow-200 dark:bg-yellow-500/30",
                bar: "bg-yellow-500 dark:bg-yellow-500",
            },
            error: {
                background: "bg-red-200 dark:bg-red-500/30",
                bar: "bg-red-500 dark:bg-red-500",
            },
            success: {
                background: "bg-emerald-200 dark:bg-emerald-500/30",
                bar: "bg-emerald-500 dark:bg-emerald-500",
            },
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

interface ProgressBarProps
    extends React.HTMLProps<HTMLDivElement>,
        VariantProps<typeof progressBarVariants> {
    value?: number
    max?: number
    label?: string
    showAnimation?: boolean
    mode?: "progress" | "indicator"
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    (
        {
            value = 0,
            max = 100,
            label,
            showAnimation = false,
            variant,
            mode = "progress",
            className,
            ...props
        },
        forwardedRef,
    ) => {
        const safeValue = Math.min(max, Math.max(value, 0))
        const { background, bar } = progressBarVariants({ variant })

        const width =
            mode === "indicator"
                ? "100%"
                : max
                    ? `${(safeValue / max) * 100}%`
                    : `${safeValue}%`

        return (
            <div
                ref={forwardedRef}
                className={cx("relative w-full", className)}
                role="progressbar"
                aria-label="Progress bar"
                aria-valuenow={mode === "progress" ? safeValue : undefined}
                aria-valuemax={mode === "progress" ? max : undefined}
                tremor-id="tremor-raw"
                {...props}
            >
                {/* Фон */}
                <div
                    className={cx("w-full rounded-full overflow-hidden", background())}
                    style={{ height: 26 }}
                >
                    {/* Заливка */}
                    <div
                        className={cx(
                            "h-full rounded-full",
                            bar(),
                            showAnimation &&
                            "transition-all duration-300 ease-in-out"
                        )}
                        style={{ width }}
                    />
                </div>

                {/* Текст по центру всей полоски */}
                {label && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-sm font-medium text-white select-none">
              {label}
            </span>
                    </div>
                )}
            </div>
        )
    }
)

ProgressBar.displayName = "ProgressBar"

export { ProgressBar, progressBarVariants, type ProgressBarProps }
