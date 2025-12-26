"use client";

import { TableMode } from "@/context/ModeContext";

interface Props {
    value: TableMode;
    onChange: (value: TableMode) => void;
}

export function ModeToggle({ value, onChange }: Props) {
    return (
        <div className="flex gap-2">
            <button
                className={`px-4 py-2 rounded ${
                    value === "quality"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                }`}
                onClick={() => onChange("quality")}
            >
                Качество лечения
            </button>

            <button
                className={`px-4 py-2 rounded ${
                    value === "finance"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                }`}
                onClick={() => onChange("finance")}
            >
                Финансы
            </button>
        </div>
    );
}
