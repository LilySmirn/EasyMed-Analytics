"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type InlineDrawerItem = {
    id: string | number;
    name: string;
    url:
        | string
        | {
        pathname: string;
        query?: Record<string, string | number | undefined>;
    };
};

type InlineDrawerContextType = {
    items: InlineDrawerItem[];
    setItems: (items: InlineDrawerItem[]) => void;
    currentId: string | number | null;
    setCurrentId: (id: string | number | null) => void;
};

const InlineDrawerContext = createContext<InlineDrawerContextType | undefined>(undefined);

export const InlineDrawerProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<InlineDrawerItem[]>([]);
    const [currentId, setCurrentId] = useState<string | number | null>(null);

    return (
        <InlineDrawerContext.Provider value={{ items, setItems, currentId, setCurrentId }}>
            {children}
        </InlineDrawerContext.Provider>
    );
};

export const useInlineDrawer = () => {
    const context = useContext(InlineDrawerContext);
    if (!context) throw new Error("useInlineDrawer must be used within InlineDrawerProvider");
    if (!context.setCurrentId) {
        return { ...context, setCurrentId: () => {} };
    }
    return context;
};
