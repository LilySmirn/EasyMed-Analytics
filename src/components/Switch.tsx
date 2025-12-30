// Tremor Switch [v1.0.0]

import React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { tv, type VariantProps } from "tailwind-variants"

import { cx, focusRing } from "@/lib/utils"

const switchVariants = tv({
    slots: {
        root: [
            // base
            "group relative isolate inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-inner outline-hidden ring-1 ring-inset transition-all",
            // фон всегда синий
            "bg-blue-500 dark:bg-blue-500",
            // ring color
            "ring-black/5 dark:ring-gray-800",
            // disabled
            "data-disabled:cursor-default",
            "data-disabled:bg-blue-300 dark:data-disabled:bg-blue-900",
            "focus:outline-none focus:ring-2 focus:ring-blue-400",
            focusRing,
        ],
        thumb: [
            // base
            "pointer-events-none relative inline-block transform appearance-none rounded-full border-none shadow-lg transition-all duration-150 ease-in-out focus:border-none focus:outline-hidden focus:outline-transparent",
            // фон кружка серый
            "bg-white dark:bg-gray-50",
            // движение при переключении
            "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
            // disabled
            "group-data-disabled:shadow-none",
            "group-data-disabled:bg-gray-200 dark:group-data-disabled:bg-gray-700",
        ],
    },
    variants: {
        size: {
            default: {
                root: "h-5 w-9",
                thumb: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
            },
            small: {
                root: "h-4 w-7",
                thumb: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
            },
        },
    },
    defaultVariants: {
        size: "default",
    },
})

interface SwitchProps
    extends Omit<
        React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
        "asChild"
    >,
        VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchProps
>(({ className, size, ...props }: SwitchProps, forwardedRef) => {
    const { root, thumb } = switchVariants({ size })
    return (
        <SwitchPrimitives.Root
            ref={forwardedRef}
            className={cx(root(), className)}
            tremor-id="tremor-raw"
            {...props}
        >
            <SwitchPrimitives.Thumb className={cx(thumb())} />
        </SwitchPrimitives.Root>
    )
})

Switch.displayName = "Switch"

export { Switch }
