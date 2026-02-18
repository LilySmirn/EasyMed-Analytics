"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
    DrawerDescription,
} from "@/components/Drawer";

import { Tooltip } from "@/components/Tooltip"; // импортируем Tooltip

import {
    RiMenuLine,      // иконка сэндвич
    RiDashboardLine,  // иконка дашборда
} from "@remixicon/react";

export function Sidebar() {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);

    return (
        <aside className="flex flex-col items-center bg-[#C8E5FF] text-white pt-2 w-[80px] min-h-screen">

            {/* Иконка столбчатой диаграммы — ведет на главную */}
            <Tooltip content="Главная страница" side="right" asChild>
                <Link href="/" className="mt-1.5">
                    <span>
                        <button className="p-3 rounded hover:bg-[#1A98FF] group">
                            <RiDashboardLine className="w-8 h-8 text-[#1A98FF] group-hover:text-white" />
                        </button>
                    </span>
                </Link>
            </Tooltip>

            {/* Иконка сэндвич — Drawer меню */}
            <Drawer open={openDrawer === "menu"} onOpenChange={(v) => setOpenDrawer(v ? "menu" : null)}>
                <Tooltip content="Меню" side="right" asChild>
                    <DrawerTrigger asChild>
                        <button className="p-3 rounded hover:bg-[#1A98FF] group">
                            <RiMenuLine className="w-8 h-8 text-[#1A98FF] group-hover:text-white" />
                        </button>
                    </DrawerTrigger>
                </Tooltip>

                <DrawerContent className="!fixed !inset-y-0 !left-20 !right-auto !w-64 !rounded-none !border-l !border-gray-200 !shadow-none !bg-gray-50 !data-[state=open]:animate-none !data-[state=closed]:animate-none">
                    <DrawerHeader>
                        <DrawerTitle>Меню</DrawerTitle>
                    </DrawerHeader>
                    <DrawerDescription />
                    <DrawerBody>
                        <ul className="flex flex-col gap-2 mt-2">
                            <li className="hover:bg-[#BADEFF] rounded px-2 py-1 cursor-pointer">
                                <Link href="/nosologies" className="block rounded px-2 py-1">
                                    Нозологии
                                </Link>
                            </li>
                            <li className="hover:bg-[#BADEFF] rounded px-2 py-1 cursor-pointer">
                                <Link href="/doctors" className="block rounded px-2 py-1">
                                    Доктора
                                </Link>
                            </li>
                            <li className="hover:bg-[#BADEFF] rounded px-2 py-1 cursor-pointer">
                                <Link href="/specialties" className="block rounded px-2 py-1">
                                    Специальности
                                </Link>
                            </li>
                            <li className="hover:bg-[#BADEFF] rounded px-2 py-1 cursor-pointer">
                                <Link href="/statistics" className="block rounded px-2 py-1">
                                    Статистика
                                </Link>
                            </li>
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <Link href="/" className="mt-auto">
                <Image
                    src="/logo3.svg"
                    alt="Logo"
                    width={60}
                    height={60}
                    className="mb-6 cursor-pointer"
                />
            </Link>
        </aside>
    );
}
