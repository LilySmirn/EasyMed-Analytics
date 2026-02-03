"use client";

import { useState } from "react";
import { RiCloseLine, RiArrowRightSLine } from "@remixicon/react";
import { Button } from "@/components/Button";
import { cx } from "@/lib/utils";

export function InlineDrawer() {
    // Начальное состояние — свернуто
    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex-shrink-0 h-full">
            {/* Панель */}
            <aside
                className={cx(
                    "transition-all duration-300 border-r border-gray-200 bg-gray-50 overflow-hidden h-full flex flex-col",
                    open ? "w-[200px]" : "w-0"
                )}
            >
                {/* Содержимое панели */}
                <div
                    className={cx(
                        "h-full flex flex-col p-4",
                        !open && "opacity-0 pointer-events-none"
                    )}
                >
                    <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <h2 className="text-sm font-semibold">Доп. меню</h2>
                        <Button
                            variant="ghost"
                            className="p-1"
                            onClick={() => setOpen(false)}
                        >
                            <RiCloseLine className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="text-sm text-gray-600 space-y-2">
                        <div>Пункт 1</div>
                        <div>Пункт 2</div>
                        <div>Пункт 3</div>
                    </div>
                </div>

                {/* Закладка на всю высоту с закругленными правыми углами */}
                {!open && (
                    <button
                        className="absolute top-0 left-0 w-4 h-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-tr-lg rounded-br-lg"
                        onClick={() => setOpen(true)}
                        aria-label="Открыть панель"
                    >
                        <RiArrowRightSLine className="w-4 h-4 text-white" />
                    </button>
                )}
            </aside>
        </div>
    );
}
