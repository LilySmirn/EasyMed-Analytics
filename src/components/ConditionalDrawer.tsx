"use client";

import { usePathname } from "next/navigation";
import { InlineDrawer } from "@/components/InlineDrawer";

export function ConditionalDrawer() {
    const pathname = usePathname();

    if (pathname === "/") return null;

    return <InlineDrawer />;
}
