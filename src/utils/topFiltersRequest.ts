import type { DateRange } from "react-day-picker";
import type { FiltersState, FilterStateValue } from "@/context/FiltersContext";
import { EMPTY_FILTER_VALUE } from "@/config/topFilters";

export type RequestPrimitive = string | number | boolean;
export type RequestValue = RequestPrimitive | RequestPrimitive[];
export type RequestPayload = Record<string, RequestValue>;

type ExtraParams = Record<string, RequestValue | null | undefined>;

function normalizeArrayValue(value: RequestPrimitive[]) {
    return value
        .filter((item) => item !== null && item !== undefined)
        .map((item) => String(item).trim())
        .filter((item) => item !== "" && item !== EMPTY_FILTER_VALUE)
        .sort();
}

function normalizeFilterValue(value: FilterStateValue): string | string[] | null {
    if (Array.isArray(value)) {
        const normalized = normalizeArrayValue(value);
        return normalized.length > 0 ? normalized : null;
    }

    const normalized = String(value).trim();

    if (!normalized || normalized === EMPTY_FILTER_VALUE) {
        return null;
    }

    return normalized;
}

function normalizeExtraValue(value: RequestValue | null | undefined): string | string[] | null {
    if (value == null) return null;

    if (Array.isArray(value)) {
        const normalized = normalizeArrayValue(value);
        return normalized.length > 0 ? normalized : null;
    }

    const normalized = String(value).trim();
    return normalized !== "" ? normalized : null;
}

function formatDateForApi(date: Date | undefined): string | null {
    if (!date || Number.isNaN(date.getTime())) {
        return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function buildTopFiltersPayload(
    filters: FiltersState,
    options?: {
        dateRange?: DateRange;
        extraParams?: ExtraParams;
    }
): RequestPayload {
    const payload: RequestPayload = {};
    const extraParams = options?.extraParams ?? {};

    Object.entries(filters).forEach(([key, value]) => {
        const normalized = normalizeFilterValue(value);
        if (normalized !== null) {
            payload[key] = normalized;
        }
    });

    const from = formatDateForApi(options?.dateRange?.from);
    const to = formatDateForApi(options?.dateRange?.to);

    if (from) {
        payload.dateFrom = from;
    }

    if (to) {
        payload.dateTo = to;
    }

    Object.entries(extraParams).forEach(([key, value]) => {
        const normalized = normalizeExtraValue(value);
        if (normalized !== null) {
            payload[key] = normalized;
        }
    });

    return payload;
}

export function buildTopFiltersSearchParams(
    filters: FiltersState,
    options?: {
        dateRange?: DateRange;
        extraParams?: ExtraParams;
    }
): URLSearchParams {
    const payload = buildTopFiltersPayload(filters, options);
    const params = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (value.length > 0) {
                params.set(key, value.join(","));
            }
            return;
        }

        params.set(key, String(value));
    });

    return params;
}

export function buildUrlWithTopFilters(
    basePath: string,
    filters: FiltersState,
    options?: {
        dateRange?: DateRange;
        extraParams?: ExtraParams;
    }
): string {
    const params = buildTopFiltersSearchParams(filters, options);
    const queryString = params.toString();

    return queryString ? `${basePath}?${queryString}` : basePath;
}

export function createTopFiltersRequestKey(
    filters: FiltersState,
    options?: {
        dateRange?: DateRange;
        extraParams?: ExtraParams;
    }
): string {
    const payload = buildTopFiltersPayload(filters, options);

    const sortedEntries = Object.entries(payload).sort(([left], [right]) => left.localeCompare(right));

    return JSON.stringify(
        Object.fromEntries(
            sortedEntries.map(([key, value]) => [
                key,
                Array.isArray(value) ? [...value].sort() : value,
            ])
        )
    );
}
