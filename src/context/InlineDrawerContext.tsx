"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Item = {
    id: string | number;
    name: string;
    url: string;
};

type InlineDrawerContextType = {
    items: Item[];
    setItems: (items: Item[]) => void;
};

const InlineDrawerContext = createContext<InlineDrawerContextType | undefined>(undefined);

export const InlineDrawerProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<Item[]>([]);

    return (
        <InlineDrawerContext.Provider value={{ items, setItems }}>
            {children}
        </InlineDrawerContext.Provider>
    );
};

export const useInlineDrawer = () => {
    const context = useContext(InlineDrawerContext);
    if (!context) throw new Error("useInlineDrawer must be used within InlineDrawerProvider");
    return context;
};
