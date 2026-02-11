'use client';

import { useInlineDrawer } from "@/context/InlineDrawerContext";
import { RiCloseLine, RiArrowRightSLine } from "@remixicon/react";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import Link from "next/link";

export function InlineDrawer() {
    const { items, currentId } = useInlineDrawer();
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (items.length) {
            setOpen(true);
        }
    }, [items.length]);

    if (!items.length) return null; // скрываем панель, если пусто

    return (
        <div className="relative flex-shrink-0 h-full">
            <aside
                className={cx(
                    "transition-all duration-300 border-r border-gray-200 bg-gray-50 overflow-hidden h-full flex flex-col",
                    open ? "w-64" : "w-0"
                )}
            >
                <div
                    className={cx(
                        "h-full flex flex-col pt-0 pr-4 pb-4 pl-4",
                        !open && "opacity-0 pointer-events-none"
                    )}
                >
                    <div className="h-20 flex items-center justify-between border-b border-gray-300 mb-0 px-0">
                        <h2 className="text-base font-semibold">Список элементов</h2>
                        <Button
                            variant="ghost"
                            className="p-1"
                            onClick={() => setOpen(false)}
                        >
                            <RiCloseLine className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto mt-3">
                        {items.map((item) => (
                            <Link
                                key={item.id}
                                href={item.url}
                                className={cx(
                                    "block p-2 rounded hover:bg-blue-100 transition-colors",
                                    item.id === currentId && "bg-blue-100 font-semibold"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {!open && (
                    <button
                        className="absolute top-0 left-0 w-4 h-full bg-blue-300 hover:bg-blue-400 flex items-center justify-center rounded-tr-lg rounded-br-lg"
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
