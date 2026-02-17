import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SortableHeaderProps {
    label: string;
    columnKey: string;
    sortConfig: { key: string; direction: "asc" | "desc" } | null;
    onSort: (key: string) => void;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
                                                                  label,
                                                                  columnKey,
                                                                  sortConfig,
                                                                  onSort,
                                                              }) => {
    const isActive = sortConfig?.key === columnKey;

    return (
        <div
            className="flex min-w-0 items-start gap-1 cursor-pointer select-none"
    onClick={() => onSort(columnKey)}
>
            <span className="min-w-0 whitespace-normal break-words">{label}</span>
    <span className="ml-1 flex shrink-0 flex-col items-center gap-0.5">
                <ChevronUp
        size={14}
                    className={isActive && sortConfig?.direction === "asc" ? "text-black" : "text-gray-300"}
                />
                <ChevronDown
                    size={14}
                    className={isActive && sortConfig?.direction === "desc" ? "text-black" : "text-gray-300"}
                />
            </span>
</div>
);
};
