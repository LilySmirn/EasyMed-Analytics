import {useMemo, useState} from "react";

export interface SortConfig {
    key: string;
    direction: "asc" | "desc";
}

export function useSortableData<T>(items: T[], storageName: string, initialSort?: SortConfig) {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(() => {
        const sortConfigString = localStorage.getItem(storageName);
        return sortConfigString !== null ? JSON.parse(sortConfigString): initialSort;
    });

    const sortedItems = useMemo(() => {
        if (!sortConfig) {
            return items;
        }

        return [...items].sort((a, b) => {
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
    }, [items, sortConfig]);

    const requestSort = (key: string) => {
        let direction: ("asc" | "desc") = "asc";
        if (sortConfig?.key === key) {
            direction = sortConfig.direction === "asc" ? "desc" : "asc";
        }

        setSortConfig({ key, direction: direction });
        localStorage.setItem(storageName, JSON.stringify({ key, direction: direction }));
    };

    return { items: sortedItems, requestSort, sortConfig };
}
