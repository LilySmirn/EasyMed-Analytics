import { useMemo, useState } from "react";

export interface SortConfig {
    key: string;
    direction: "asc" | "desc";
}

function safeGetItem(key: string) {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
}

function safeSetItem(key: string, value: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
}

export function useSortableData<T>(
    items: T[],
    storageName: string,
    initialSort?: SortConfig
) {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(() => {
        const stored = safeGetItem(storageName);
        return stored ? JSON.parse(stored) : initialSort ?? null;
    });

    const sortedItems = useMemo(() => {
        if (!sortConfig) return items;

        return [...items].sort((a, b) => {
            const valA = a[sortConfig.key as keyof T];
            const valB = b[sortConfig.key as keyof T];

            if (typeof valA === "string" && typeof valB === "string") {
                return sortConfig.direction === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }

            if (typeof valA === "number" && typeof valB === "number") {
                return sortConfig.direction === "asc"
                    ? valA - valB
                    : valB - valA;
            }

            return 0;
        });
    }, [items, sortConfig]);

    const requestSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";

        if (sortConfig?.key === key) {
            direction = sortConfig.direction === "asc" ? "desc" : "asc";
        }

        const next = { key, direction };
        setSortConfig(next);
        safeSetItem(storageName, JSON.stringify(next));
    };

    return { items: sortedItems, requestSort, sortConfig };
}
