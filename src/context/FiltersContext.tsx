"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

export type FilterStateValue = string | string[];
type FiltersState = Record<string, FilterStateValue>;

export interface FilterOption {
    value: string;
    label: string;
}

interface FiltersContextType {
    filters: FiltersState;
    doctorOptions: FilterOption[];
    setFilter: (key: string, value: FilterStateValue) => void;
    setDoctorOptions: (options: FilterOption[]) => void;
    clearFilters: () => void;
}

const defaultDoctorOption: FilterOption = { value: "all", label: "Все врачи" };
const multiSelectFilterKeys = new Set(["specialty", "branch", "doctor"]);

function normalizeFilterValue(key: string, value: FilterStateValue | undefined): FilterStateValue {
    if (!multiSelectFilterKeys.has(key)) {
        return typeof value === "string" ? value : "all";
    }

    if (Array.isArray(value)) {
        return value.filter(Boolean);
    }

    if (!value || value === "all") {
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

function safeGetFilters(): FiltersState {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem("filters");
    return raw ? normalizeFilters(JSON.parse(raw)) : {};
}

function safeSetFilters(filters: FiltersState) {
    if (typeof window === "undefined") return;
    localStorage.setItem("filters", JSON.stringify(filters));
}

function areOptionsEqual(left: FilterOption[], right: FilterOption[]) {
    return left.length === right.length && left.every((option, index) => {
        const rightOption = right[index];
        return rightOption && option.value === rightOption.value && option.label === rightOption.label;
    });
}

const FiltersContext = createContext<FiltersContextType>({
    filters: {},
    doctorOptions: [defaultDoctorOption],
    setFilter: () => {},
    setDoctorOptions: () => {},
    clearFilters: () => {},
});

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<FiltersState>(() => safeGetFilters());
    const [doctorOptions, setDoctorOptionsState] = useState<FilterOption[]>([defaultDoctorOption]);

    const setFilter = useCallback((key: string, value: FilterStateValue) => {
        setFilters((currentFilters) => {
            const nextFilters = { ...currentFilters, [key]: normalizeFilterValue(key, value) };
            safeSetFilters(nextFilters);
            return nextFilters;
        });
    }, []);

    const setDoctorOptions = useCallback((options: FilterOption[]) => {
        const nextOptions = [defaultDoctorOption, ...options.filter((option) => option.value !== "all")];

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
        if (typeof window !== "undefined") {
            localStorage.removeItem("filters");
        }
    }, []);

    const value = useMemo(
        () => ({ filters, doctorOptions, setFilter, setDoctorOptions, clearFilters }),
        [clearFilters, doctorOptions, filters, setDoctorOptions, setFilter]
    );

    return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

export const useFilters = () => useContext(FiltersContext);
