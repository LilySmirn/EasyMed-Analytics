"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    ReactNode,
} from "react";
import { subMonths } from "date-fns";
import type { DateRange } from "react-day-picker";
import { EMPTY_FILTER_VALUE, isMultiSelectFilter } from "@/config/topFilters";

export type FilterStateValue = string | string[];
export type FiltersState = Record<string, FilterStateValue>;

export interface FilterOption {
    value: string;
    label: string;
}

export interface StoredDateRange {
    from?: string;
    to?: string;
}

interface FiltersContextType {
    filters: FiltersState;
    dateRange: DateRange | undefined;
    doctorOptions: FilterOption[];
    setFilter: (key: string, value: FilterStateValue) => void;
    setDateRange: (value: DateRange | undefined) => void;
    setDoctorOptions: (options: FilterOption[]) => void;
    clearFilters: () => void;
}

const FILTERS_STORAGE_KEY = "filters";
const DATE_RANGE_STORAGE_KEY = "filters:dateRange";

const defaultDoctorOption: FilterOption = { value: "all", label: "Все врачи" };

function getDefaultDateRange(today: Date): DateRange {
    return {
        from: subMonths(today, 1),
        to: today,
    };
}

function normalizeFilterValue(key: string, value: FilterStateValue | undefined): FilterStateValue {
    if (!isMultiSelectFilter(key)) {
        return typeof value === "string" ? value : EMPTY_FILTER_VALUE;
    }

    if (Array.isArray(value)) {
        return value.filter(Boolean).filter((item) => item !== EMPTY_FILTER_VALUE);
    }

    if (!value || value === EMPTY_FILTER_VALUE) {
        return [];
    }

    return [value];
}

function normalizeFilters(rawFilters: unknown): FiltersState {
    if (!rawFilters || typeof rawFilters !== "object") return {};

    return Object.entries(rawFilters as Record<string, unknown>).reduce<FiltersState>((acc, [key, value]) => {
        if (typeof value === "string" || Array.isArray(value)) {
            acc[key] = normalizeFilterValue(key, value as FilterStateValue);
        }
        return acc;
    }, {});
}

function serializeDateRange(value: DateRange | undefined): StoredDateRange | null {
    if (!value?.from && !value?.to) return null;

    return {
        from: value.from?.toISOString() ?? undefined,
        to: value.to?.toISOString() ?? undefined,
    };
}

function deserializeDateRange(value: StoredDateRange | null): DateRange | undefined {
    if (!value) return undefined;

    return {
        from: value.from ? new Date(value.from) : undefined,
        to: value.to ? new Date(value.to) : undefined,
    };
}

function safeGetFilters(): FiltersState {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem(FILTERS_STORAGE_KEY);
    return raw ? normalizeFilters(JSON.parse(raw)) : {};
}

function safeSetFilters(filters: FiltersState) {
    if (typeof window === "undefined") return;
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
}

function safeGetDateRange(): DateRange | undefined {
    if (typeof window === "undefined") return getDefaultDateRange(new Date());

    const raw = localStorage.getItem(DATE_RANGE_STORAGE_KEY);
    if (!raw) {
        return getDefaultDateRange(new Date());
    }

    return deserializeDateRange(JSON.parse(raw));
}

function safeSetDateRange(value: DateRange | undefined) {
    if (typeof window === "undefined") return;

    const serialized = serializeDateRange(value);

    if (!serialized) {
        localStorage.removeItem(DATE_RANGE_STORAGE_KEY);
        return;
    }

    localStorage.setItem(DATE_RANGE_STORAGE_KEY, JSON.stringify(serialized));
}

function areOptionsEqual(left: FilterOption[], right: FilterOption[]) {
    return left.length === right.length && left.every((option, index) => {
        const rightOption = right[index];
        return rightOption && option.value === rightOption.value && option.label === rightOption.label;
    });
}

const FiltersContext = createContext<FiltersContextType>({
    filters: {},
    dateRange: undefined,
    doctorOptions: [defaultDoctorOption],
    setFilter: () => {},
    setDateRange: () => {},
    setDoctorOptions: () => {},
    clearFilters: () => {},
});

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<FiltersState>(() => safeGetFilters());
    const [dateRange, setDateRangeState] = useState<DateRange | undefined>(() => safeGetDateRange());
    const [doctorOptions, setDoctorOptionsState] = useState<FilterOption[]>([defaultDoctorOption]);

    const setFilter = useCallback((key: string, value: FilterStateValue) => {
        setFilters((currentFilters) => {
            const nextFilters = { ...currentFilters, [key]: normalizeFilterValue(key, value) };
            safeSetFilters(nextFilters);
            return nextFilters;
        });
    }, []);

    const setDateRange = useCallback((value: DateRange | undefined) => {
        setDateRangeState(value);
        safeSetDateRange(value);
    }, []);

    const setDoctorOptions = useCallback((options: FilterOption[]) => {
        const nextOptions = [defaultDoctorOption, ...options.filter((option) => option.value !== EMPTY_FILTER_VALUE)];

        setDoctorOptionsState((currentOptions) => (
            areOptionsEqual(currentOptions, nextOptions) ? currentOptions : nextOptions
        ));

        setFilters((currentFilters) => {
            const currentDoctor = normalizeFilterValue("doctor", currentFilters.doctor);
            if (!Array.isArray(currentDoctor)) {
                return currentFilters;
            }

            const allowedDoctorIds = new Set(nextOptions.map((option) => option.value));
            const nextDoctorFilter = currentDoctor.filter((doctorId) => allowedDoctorIds.has(doctorId));

            if (nextDoctorFilter.length === currentDoctor.length) {
                return currentFilters;
            }

            const nextFilters = { ...currentFilters, doctor: nextDoctorFilter };
            safeSetFilters(nextFilters);
            return nextFilters;
        });
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({});
        setDateRangeState(getDefaultDateRange(new Date()));

        if (typeof window !== "undefined") {
            localStorage.removeItem(FILTERS_STORAGE_KEY);
            localStorage.removeItem(DATE_RANGE_STORAGE_KEY);
        }
    }, []);

    const value = useMemo(
        () => ({
            filters,
            dateRange,
            doctorOptions,
            setFilter,
            setDateRange,
            setDoctorOptions,
            clearFilters,
        }),
        [clearFilters, dateRange, doctorOptions, filters, setDateRange, setDoctorOptions, setFilter]
    );

    return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

export const useFilters = () => useContext(FiltersContext);
