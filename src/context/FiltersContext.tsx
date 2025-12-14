"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type FiltersState = Record<string, string>;

interface FiltersContextType {
    filters: FiltersState;
    setFilter: (key: string, value: string) => void;
    clearFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType>({
    filters: getFilters(),
    setFilter: () => {},
    clearFilters: () => {},
});

interface FiltersProviderProps {
    children: ReactNode;
}

function getFilters (){
    const filterValueString = localStorage.getItem("filters");
    console.log("getting filter cache", filterValueString);
    let filterValue: FiltersState;

    if (filterValueString !== null) {
        filterValue = JSON.parse(filterValueString);
        return filterValue;
    }

    return {};
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
    //const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [filters, setFilters] = useState<FiltersState>(() => getFilters());

    /*useEffect(() => {
        if (!searchParams) return;

        const initialFilters: FiltersState = {};
        searchParams.forEach((value, key) => {
            initialFilters[key] = value;
        });

        const topLevelPaths = ["/doctors", "/nosologies", "/statistics"];
        const queryLength = Array.from(searchParams.keys()).length;

        if (topLevelPaths.includes(pathname) && queryLength === 0) {
            setFilters({});
        } else if (queryLength > 0) {
            setFilters(initialFilters);
        }
        // Иначе оставляем текущее состояние (например, на /appointment/123)
    }, [searchParams, pathname]);*/

    const setFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        console.log(`setting filter: {key}, {value}`);

        localStorage.setItem("filters", JSON.stringify(newFilters));

        /*const query = new URLSearchParams(
            Object.entries(newFilters).filter(([_, v]) => v && v !== "all") as [string, string][]
        ).toString();
        router.replace(`${pathname}${query ? `?${query}` : ""}`);*/
    };

    const clearFilters = () => {
        setFilters({});
        //localStorage.setItem("filters", JSON.stringify({}));
        router.replace(pathname);
    };

    return (
        <FiltersContext.Provider value={{ filters, setFilter, clearFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = () => useContext(FiltersContext);
