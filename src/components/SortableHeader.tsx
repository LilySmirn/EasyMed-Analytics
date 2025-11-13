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
            className="flex items-center gap-1 cursor-pointer select-none"
            onClick={() => onSort(columnKey)}
        >
            {label}
            <span className="flex flex-col items-center gap-0.5 ml-1">
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
