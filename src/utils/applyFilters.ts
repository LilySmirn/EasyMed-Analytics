// src/utils/applyFilters.ts

export type RangeFilterValue = { min?: number; max?: number };
export type FilterValue = string | number | string[] | RangeFilterValue;
export type Filters = Record<string, FilterValue>;

export type CustomFilter<T> = (item: T, value: FilterValue) => boolean;

export interface FilterConfig<T> {
    field?: string;
    custom?: CustomFilter<T>;
    substring?: boolean;
}

export function applyFilters<T extends Record<string, any>>(
    data: T[],
    filters: Filters,
    config: Record<string, FilterConfig<T>> = {}
): T[] {
    return data.filter((item) => (
        Object.entries(filters).every(([key, value]) => {
            if (
                value === undefined ||
                value === null ||
                value === "all" ||
                (Array.isArray(value) && value.length === 0)
            ) {
                return true;
            }

            const conf: FilterConfig<T> = config[key] || {};
            const field = conf.field || key;

            if (conf.custom) {
                return conf.custom(item, value);
            }

            const itemValue = item[field];
            if (itemValue == null) return true;

            if (Array.isArray(value)) {
                return value.some((selectedValue) => String(itemValue).toLowerCase() === String(selectedValue).toLowerCase());
            }

            if (
                typeof value === "object" &&
                !Array.isArray(value) &&
                ("min" in value || "max" in value) &&
                typeof itemValue === "number"
            ) {
                if (value.min !== undefined && itemValue < value.min) return false;
                if (value.max !== undefined && itemValue > value.max) return false;
                return true;
            }

            if (conf.substring && typeof itemValue === "string") {
                return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
            }

            return String(itemValue).toLowerCase() === String(value).toLowerCase();
        })
    ));
}
