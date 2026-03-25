export const EMPTY_FILTER_VALUE = "all";

export const MULTI_SELECT_FILTER_KEYS = new Set([
    "specialty",
    "branch",
    "doctor",
]);

export function isMultiSelectFilter(key: string) {
    return MULTI_SELECT_FILTER_KEYS.has(key);
}
