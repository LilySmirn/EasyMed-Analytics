"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

type FiltersState = Record<string, string>;

export interface FilterOption {
    value: string;
    label: string;
}

interface FiltersContextType {
    filters: FiltersState;
    doctorOptions: FilterOption[];
    setFilter: (key: string, value: string) => void;
    setDoctorOptions: (options: FilterOption[]) => void;
    clearFilters: () => void;
}

const defaultDoctorOption: FilterOption = { value: "all", label: "Все врачи" };

function safeGetFilters(): FiltersState {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem("filters");
    return raw ? JSON.parse(raw) : {};
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

    const setFilter = useCallback((key: string, value: string) => {
        setFilters((currentFilters) => {
            const nextFilters = { ...currentFilters, [key]: value };
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
            const currentDoctor = currentFilters.doctor;
            if (!currentDoctor || nextOptions.some((option) => option.value === currentDoctor)) {
                return currentFilters;
            }

            const nextFilters = { ...currentFilters, doctor: "all" };
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
