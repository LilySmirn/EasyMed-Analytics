import { useState, useMemo } from "react";

export interface SortConfig {
    key: string;
    direction: "asc" | "desc";
}

export function useSortableData<T>(items: T[], initialSort?: SortConfig) {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialSort || null);

    const sortedItems = useMemo(() => {
        if (!sortConfig) return items;

        const sorted = [...items].sort((a, b) => {
            const valA = a[sortConfig.key as keyof T];
            const valB = b[sortConfig.key as keyof T];

            if (typeof valA === "string" && typeof valB === "string") {
                return sortConfig.direction === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }

            if (typeof valA === "number" && typeof valB === "number") {
                return sortConfig.direction === "asc" ? valA - valB : valB - valA;
            }

            return 0;
        });

        return sorted;
    }, [items, sortConfig]);

    const requestSort = (key: string) => {
        if (sortConfig?.key === key) {
            setSortConfig({
                key,
                direction: sortConfig.direction === "asc" ? "desc" : "asc",
            });
        } else {
            setSortConfig({ key, direction: "asc" });
        }
    };

    return { items: sortedItems, requestSort, sortConfig };
}
