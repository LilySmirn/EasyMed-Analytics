"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TableMode } from "@/components/ModeToggle";

interface ModeContextValue {
    mode: TableMode;
    setMode: (mode: TableMode) => void;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setModeState] = useState<TableMode>("quality");
    const [isMounted, setIsMounted] = useState(false);

    // При монтировании читаем из localStorage
    useEffect(() => {
        const saved = localStorage.getItem("tableMode") as TableMode | null;
        if (saved === "finance" || saved === "quality") {
            setModeState(saved);
        }
        setIsMounted(true);
    }, []);

    // Сохраняем при изменении
    const setMode = (newMode: TableMode) => {
        setModeState(newMode);
        if (isMounted) {
            localStorage.setItem("tableMode", newMode);
        }
    };

    return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export function useMode() {
    const context = useContext(ModeContext);
    if (!context) throw new Error("useMode must be used within a ModeProvider");
    return context;
}
