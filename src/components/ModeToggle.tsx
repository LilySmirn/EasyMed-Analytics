"use client"

import Image from "next/image"
import { TableMode } from "@/context/ModeContext"
import { Switch } from "@/components/Switch"

interface Props {
    value: TableMode
    onChange: (value: TableMode) => void
}

export function ModeToggle({ value, onChange }: Props) {
    // boolean для Switch
    const isFinance = value === "finance"

    return (
        <div className="flex items-center gap-3">
            {/* Иконка "Качество лечения" */}
            <div
                className={`transition-opacity cursor-pointer ${
                    !isFinance ? "opacity-100" : "opacity-40"
                }`}
                onClick={() => onChange("quality")}
            >
                <Image
                    src="/eagle.png"
                    alt="Качество лечения"
                    width={30}
                    height={30}
                />
            </div>

            {/* Сам Switch */}
            <Switch
                checked={isFinance}
                onCheckedChange={(checked: boolean) => {
                    // проверка на undefined на всякий случай
                    if (checked === undefined) return
                    onChange(checked ? "finance" : "quality")
                }}
            />

            {/* Иконка "Финансы" */}
            <div
                className={`transition-opacity cursor-pointer ${
                    isFinance ? "opacity-100" : "opacity-40"
                }`}
                onClick={() => onChange("finance")}
            >
                <Image
                    src="/ruble.png"
                    alt="Финансы"
                    width={22}
                    height={22}
                />
            </div>
        </div>
    )
}
