"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

type FiltersState = Record<string, string>;

interface FiltersContextType {
    filters: FiltersState;
    setFilter: (key: string, value: string) => void;
    clearFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType>({
    filters: {},           // ✅ безопасно
    setFilter: () => {},
    clearFilters: () => {},
});

interface FiltersProviderProps {
    children: ReactNode;
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [filters, setFilters] = useState<FiltersState>({});

    // ⬇️ читаем localStorage ТОЛЬКО после маунта
    useEffect(() => {
        const stored = localStorage.getItem("filters");
        if (stored) {
            setFilters(JSON.parse(stored));
        }
    }, []);

    const setFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        localStorage.setItem("filters", JSON.stringify(newFilters));
    };

    const clearFilters = () => {
        setFilters({});
        localStorage.removeItem("filters");
        router.replace(pathname);
    };

    return (
        <FiltersContext.Provider value={{ filters, setFilter, clearFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = () => useContext(FiltersContext);
