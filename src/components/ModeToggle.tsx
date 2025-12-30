"use client"

import { TableMode } from "@/context/ModeContext"
import { Switch } from "@/components/Switch"

interface Props {
    value: TableMode
    onChange: (value: TableMode) => void
}

export function ModeToggle({ value, onChange }: Props) {
    const isFinance = value === "finance"

    return (
        <div className="flex items-center gap-3">
      <span
          className={`text-sm transition-colors ${
              !isFinance ? "font-medium text-blue-600" : "text-gray-500"
          }`}
      >
        Качество лечения
      </span>

            <Switch
                checked={isFinance}
                onCheckedChange={(checked) =>
                    onChange(checked ? "finance" : "quality")
                }
            />

            <span
                className={`text-sm transition-colors ${
                    isFinance ? "font-medium text-blue-600" : "text-gray-500"
                }`}
            >
        Финансы
      </span>
        </div>
    )
}
