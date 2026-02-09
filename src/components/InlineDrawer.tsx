'use client';

import { useInlineDrawer } from "@/context/InlineDrawerContext";
import { RiCloseLine, RiArrowRightSLine } from "@remixicon/react";
import { Button } from "@/components/Button";
import { useState } from "react";
import { cx } from "@/lib/utils";
import Link from "next/link";

interface InlineDrawerProps {
    currentId?: string | null; // текущий выбранный элемент
}

export function InlineDrawer({ currentId }: InlineDrawerProps) {
    const { items } = useInlineDrawer();
    // items.push({ id: 1234, name: 'Test', url: 'http://localhost:8080' });
    const [open, setOpen] = useState(false);

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
                        "h-full flex flex-col p-4",
                        !open && "opacity-0 pointer-events-none"
                    )}
                >
                    <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <h2 className="text-sm font-semibold">Список элементов</h2>
                        <Button
                            variant="ghost"
                            className="p-1"
                            onClick={() => setOpen(false)}
                        >
                            <RiCloseLine className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
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
