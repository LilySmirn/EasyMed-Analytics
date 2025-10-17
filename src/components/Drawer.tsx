"use client";

import * as React from "react";
import * as DrawerPrimitives from "@radix-ui/react-dialog";
import { RiCloseLine } from "@remixicon/react";
import { Button } from "@/components/Button";
import { cx, focusRing } from "@/lib/utils";

const Drawer = (props: React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Root>) => {
    return <DrawerPrimitives.Root {...props} />;
};
Drawer.displayName = "Drawer";

const DrawerTrigger = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitives.Trigger>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Trigger>
>(({ className, ...props }, ref) => (
    <DrawerPrimitives.Trigger ref={ref} className={cx(className)} {...props} />
));
DrawerTrigger.displayName = "Drawer.Trigger";

/**
 * Overlay отключаем, чтобы не было затемнения
 */
const DrawerOverlay = () => null;

const DrawerPortal = DrawerPrimitives.Portal;
DrawerPortal.displayName = "DrawerPortal";

const DrawerContent = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitives.Content>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Content>
>(({ className, ...props }, forwardedRef) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitives.Content
            ref={forwardedRef}
            className={cx(
                // позиционирование
                "fixed inset-y-2 left-20 z-50 mx-auto flex w-48 flex-1 flex-col overflow-y-auto rounded-md border p-4 shadow-lg sm:p-6",
                // границы и фон
                "border-gray-200 dark:border-gray-900 bg-white dark:bg-[#090E1A]",
                // анимация слева
                "data-[state=closed]:animate-drawer-slide-left-out data-[state=open]:animate-drawer-slide-left-in",
                focusRing,
                className
            )}
            {...props}
        />
    </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => (
        <div
            ref={ref}
            className="flex items-start justify-between gap-x-4 border-b border-gray-200 pb-4 dark:border-gray-900"
            {...props}
        >
            <div className={cx("mt-1 flex flex-col gap-y-1", className)}>{children}</div>
            <DrawerPrimitives.Close asChild>
                <Button
                    variant="ghost"
                    className="aspect-square p-1 hover:bg-gray-100 dark:hover:bg-gray-400/10"
                >
                    <RiCloseLine className="size-6" aria-hidden="true" />
                </Button>
            </DrawerPrimitives.Close>
        </div>
    )
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerTitle = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitives.Title>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Title>
>(({ className, ...props }, forwardedRef) => (
    <DrawerPrimitives.Title
        ref={forwardedRef}
        className={cx("text-base font-semibold text-gray-900 dark:text-gray-50", className)}
        {...props}
    />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cx("flex-1 py-4", className)} {...props} />
    )
);
DrawerBody.displayName = "DrawerBody";

export {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
};
