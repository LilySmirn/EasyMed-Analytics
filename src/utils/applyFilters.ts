// src/utils/applyFilters.ts

export type FilterValue = string | number | { min?: number; max?: number };
export type Filters = Record<string, FilterValue>;

export type CustomFilter<T> = (item: T, value: FilterValue) => boolean;

export interface FilterConfig<T> {
    field?: string;           // поле данных
    custom?: CustomFilter<T>; // кастомная логика
    substring?: boolean;      // поиск по подстроке
}

export function applyFilters<T extends Record<string, any>>(
    data: T[],
    filters: Filters,
    config: Record<string, FilterConfig<T>> = {}
): T[] {
    return data.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
            if (value === undefined || value === null || value === "all") return true;

            const conf: FilterConfig<T> = config[key] || {};
            const field = conf.field || key;

            if (conf.custom) {
                return conf.custom(item, value);
            }

            const itemValue = item[field];
            if (itemValue == null) return true;

            if (conf.substring && typeof itemValue === "string") {
                return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
            }

            if (typeof value === "object" && ("min" in value || "max" in value) && typeof itemValue === "number") {
                if (value.min !== undefined && itemValue < value.min) return false;
                if (value.max !== undefined && itemValue > value.max) return false;
                return true;
            }

            return String(itemValue).toLowerCase() === String(value).toLowerCase();
        });
    });
}
