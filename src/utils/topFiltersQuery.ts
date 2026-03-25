import type { FiltersState, FilterStateValue } from "@/context/FiltersContext";

function serializeFilterValue(value: FilterStateValue): string | null {
    if (Array.isArray(value)) {
        const normalized = value.filter((item) => item && item !== "all");
        return normalized.length > 0 ? normalized.join(",") : null;
    }

    if (!value || value === "all") {
        return null;
    }

    return value;
}

export function buildTopFiltersSearchParams(
    filters: FiltersState,
    extraParams: Record<string, string | undefined | null> = {}
): URLSearchParams {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        const serializedValue = serializeFilterValue(value);
        if (serializedValue != null) {
            params.set(key, serializedValue);
        }
    });

    Object.entries(extraParams).forEach(([key, value]) => {
        if (value != null && value !== "") {
            params.set(key, value);
        }
    });

    return params;
}

export function getTopFiltersPayload(
    filters: FiltersState,
    extraParams: Record<string, string | undefined | null> = {}
): Record<string, string> {
    return Object.fromEntries(buildTopFiltersSearchParams(filters, extraParams).entries());
}

export function buildUrlWithTopFilters(
    basePath: string,
    filters: FiltersState,
    extraParams: Record<string, string | undefined | null> = {}
): string {
    const params = buildTopFiltersSearchParams(filters, extraParams);
    const queryString = params.toString();
    const url = queryString ? `${basePath}?${queryString}` : basePath;

    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
        console.debug("[TopFilters] Serialized payload:", Object.fromEntries(params.entries()));
        console.debug("[TopFilters] Request URL:", url);
    }

    return url;
}
