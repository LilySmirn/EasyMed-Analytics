"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FiltersState = Record<string, string>;

interface FiltersContextType {
    filters: FiltersState;
    setFilter: (key: string, value: string) => void;
    clearFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType>({
    filters: {},
    setFilter: () => {},
    clearFilters: () => {},
})

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<FiltersState>({});

    const setFilter = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    }

    const clearFilters = () => setFilters({});

    return (
        <FiltersContext.Provider value={{ filters, setFilter, clearFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};
 export const useFilters = () => useContext(FiltersContext);
