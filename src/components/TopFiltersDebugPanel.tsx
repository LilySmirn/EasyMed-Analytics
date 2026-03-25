"use client";

import { useEffect, useMemo, useState } from "react";
import { useFilters } from "@/context/FiltersContext";
import {
    buildTopFiltersPayload,
    buildTopFiltersSearchParams,
    buildUrlWithTopFilters,
} from "@/utils/topFiltersRequest";

type DebugEntry = {
    timestamp: string;
    filters: unknown;
    dateRange: {
        from: string | null;
        to: string | null;
    };
    payload: unknown;
    params: Record<string, string>;
    url: string;
};

function formatDate(date: Date | undefined) {
    return date ? date.toISOString().slice(0, 10) : null;
}

export function TopFiltersDebugPanel() {
    const { filters, dateRange } = useFilters();
    const [history, setHistory] = useState<DebugEntry[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const debugDateRange = useMemo(
        () => ({
            from: formatDate(dateRange?.from),
            to: formatDate(dateRange?.to),
        }),
        [dateRange]
    );

    const payload = useMemo(
        () => buildTopFiltersPayload(filters, { dateRange }),
        [filters, dateRange]
    );

    const params = useMemo(
        () => Object.fromEntries(buildTopFiltersSearchParams(filters, { dateRange }).entries()),
        [filters, dateRange]
    );

    const url = useMemo(
        () => buildUrlWithTopFilters("/api/debug", filters, { dateRange }),
        [filters, dateRange]
    );

    useEffect(() => {
        const entry: DebugEntry = {
            timestamp: new Date().toLocaleString(),
            filters,
            dateRange: debugDateRange,
            payload,
            params,
            url,
        };

        setHistory((prev) => {
            const next = [entry, ...prev];

            return next.slice(0, 20);
        });
    }, [debugDateRange, filters, params, payload, url]);

    if (process.env.NODE_ENV === "production") {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-[9999] w-[420px] max-w-[calc(100vw-2rem)]">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="mb-2 rounded border border-gray-300 bg-white px-3 py-2 text-sm shadow dark:border-gray-700 dark:bg-gray-900"
            >
                {isOpen ? "Скрыть отладку фильтров" : "Показать отладку фильтров"}
            </button>

            {isOpen && (
                <div className="max-h-[80vh] overflow-auto rounded-lg border border-gray-300 bg-white p-4 text-xs shadow-xl dark:border-gray-700 dark:bg-gray-900">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-semibold">Отладка модуля сбора фильтров</h2>

                        <button
                            type="button"
                            onClick={() => setHistory([])}
                            className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-700"
                        >
                            Очистить
                        </button>
                    </div>

                    <div className="space-y-4">
                        {history.map((entry, index) => (
                            <div key={`${entry.timestamp}-${index}`} className="rounded border border-gray-200 p-3 dark:border-gray-800">
                                <div className="mb-2 text-[11px] text-gray-500">
                                    Срабатывание: {entry.timestamp}
                                </div>

                                <div className="mb-2">
                                    <div className="mb-1 font-medium">filters</div>
                                    <pre className="overflow-x-auto rounded bg-gray-50 p-2 dark:bg-gray-800">
                                        {JSON.stringify(entry.filters, null, 2)}
                                    </pre>
                                </div>

                                <div className="mb-2">
                                    <div className="mb-1 font-medium">dateRange</div>
                                    <pre className="overflow-x-auto rounded bg-gray-50 p-2 dark:bg-gray-800">
                                        {JSON.stringify(entry.dateRange, null, 2)}
                                    </pre>
                                </div>

                                <div className="mb-2">
                                    <div className="mb-1 font-medium">payload</div>
                                    <pre className="overflow-x-auto rounded bg-gray-50 p-2 dark:bg-gray-800">
                                        {JSON.stringify(entry.payload, null, 2)}
                                    </pre>
                                </div>

                                <div className="mb-2">
                                    <div className="mb-1 font-medium">params</div>
                                    <pre className="overflow-x-auto rounded bg-gray-50 p-2 dark:bg-gray-800">
                                        {JSON.stringify(entry.params, null, 2)}
                                    </pre>
                                </div>

                                <div>
                                    <div className="mb-1 font-medium">url</div>
                                    <pre className="overflow-x-auto rounded bg-gray-50 p-2 dark:bg-gray-800">
                                        {entry.url}
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
