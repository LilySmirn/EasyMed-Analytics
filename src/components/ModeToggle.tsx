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
        <div className="flex shrink-0 items-center gap-3">
            {/* Иконка "Качество лечения" */}
            <div
                className={`shrink-0 cursor-pointer transition-opacity ${
                    !isFinance ? "opacity-100" : "opacity-40"
                }`}
                onClick={() => onChange("quality")}
            >
                <Image
                    src="/eagle.png"
                    alt="Качество лечения"
                    width={30}
                    height={30}
                    className="h-[30px] w-[30px] shrink-0 max-w-none"
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
                className={`shrink-0 cursor-pointer transition-opacity ${
                    isFinance ? "opacity-100" : "opacity-40"
                }`}
                onClick={() => onChange("finance")}
            >
                <Image
                    src="/ruble.png"
                    alt="Финансы"
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] shrink-0 max-w-none"
                />
            </div>
        </div>
    )
}
