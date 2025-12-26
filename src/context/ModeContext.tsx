"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type TableMode = "quality" | "finance";

interface ModeContextValue {
    mode: TableMode;
    setMode: (mode: TableMode) => void;
    isReady: boolean;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<TableMode>("quality");
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("tableMode");
        if (saved === "quality" || saved === "finance") {
            setMode(saved);
        }
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (isReady) {
            localStorage.setItem("tableMode", mode);
        }
    }, [mode, isReady]);

    return (
        <ModeContext.Provider value={{ mode, setMode, isReady }}>
            {children}
        </ModeContext.Provider>
    );
}

export function useMode() {
    const context = useContext(ModeContext);
    if (!context) {
        throw new Error("useMode must be used within ModeProvider");
    }
    return context;
}
