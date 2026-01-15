"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FiltersState = Record<string, string>;

interface FiltersContextType {
    filters: FiltersState;
    setFilter: (key: string, value: string) => void;
    clearFilters: () => void;
}

function safeGetFilters(): FiltersState {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem("filters");
    return raw ? JSON.parse(raw) : {};
}

function safeSetFilters(filters: FiltersState) {
    if (typeof window === "undefined") return;
    localStorage.setItem("filters", JSON.stringify(filters));
}

const FiltersContext = createContext<FiltersContextType>({
    filters: {},
    setFilter: () => {},
    clearFilters: () => {},
});

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<FiltersState>(() => safeGetFilters());

    const setFilter = (key: string, value: string) => {
        const next = { ...filters, [key]: value };
        setFilters(next);
        safeSetFilters(next);
    };

    const clearFilters = () => {
        setFilters({});
        if (typeof window !== "undefined") {
            localStorage.removeItem("filters");
        }
    };

    return (
        <FiltersContext.Provider value={{ filters, setFilter, clearFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = () => useContext(FiltersContext);
