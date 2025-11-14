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
    DrawerBody, DrawerDescription,
} from "@/components/Drawer";

import {
    RiHome5Line,
    RiSettings3Line,
} from "@remixicon/react";

export function Sidebar() {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);

    return (
        <aside className="flex flex-col items-center bg-[#0085FF] dark:bg-gray-900 text-white dark:text-gray-100 pt-2 pb-6 w-[80px] min-h-screen">
            <Link href="/">
                <Image
                    src="/logo2.svg"
                    alt="Logo"
                    width={65}
                    height={65}
                    className="mb-6 cursor-pointer"
                />
            </Link>

            {/* Иконка 1 — Дом */}
            <Drawer open={openDrawer === "home"} onOpenChange={(v) => setOpenDrawer(v ? "home" : null)}>
                <DrawerTrigger asChild>
                    <button className="p-3 rounded hover:bg-[#1A98FF] dark:hover:bg-gray-800">
                        <RiHome5Line className="w-6 h-6" />
                    </button>
                </DrawerTrigger>

                <DrawerContent className="!fixed !inset-y-0 !left-20 !right-auto !w-64 !rounded-none !border-l !border-gray-200 dark:!border-gray-800 !shadow-none !bg-gray-50 dark:!bg-gray-900 !data-[state=open]:animate-none !data-[state=closed]:animate-none">
                    <DrawerHeader>
                        <DrawerTitle>Главный экран</DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        <ul className="flex flex-col gap-2 mt-2">
                            <li className="hover:bg-[#BADEFF] dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                <Link
                                    href="/nosologies"
                                    className="block hover:bg-[#BADEFF] dark:hover:bg-gray-800 rounded px-2 py-1"
                                >
                                    Нозологии
                                </Link>
                            </li>
                            <li className="hover:bg-[#BADEFF] dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                <Link
                                    href="/doctors"
                                    className="block hover:bg-[#BADEFF] dark:hover:bg-gray-800 rounded px-2 py-1"
                                >
                                    Доктора
                                </Link>
                            </li>
                            <li className="hover:bg-[#BADEFF] dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                <Link
                                    href="/specialties"
                                    className="block hover:bg-[#BADEFF] dark:hover:bg-gray-800 rounded px-2 py-1"
                                >
                                    Специальности
                                </Link>
                            </li>
                            <li className="hover:bg-[#BADEFF] dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                <Link
                                    href="/statistics"
                                    className="block hover:bg-[#BADEFF] dark:hover:bg-gray-800 rounded px-2 py-1"
                                >
                                    Статистика
                                </Link>
                            </li>
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Иконка 2 — Настройки */}
            {/*<Drawer open={openDrawer === "settings"} onOpenChange={(v) => setOpenDrawer(v ? "settings" : null)}>*/}
            {/*    <DrawerTrigger asChild>*/}
            {/*        <button className="p-3 rounded hover:bg-[#1A98FF] dark:hover:bg-gray-800">*/}
            {/*            <RiSettings3Line className="w-6 h-6" />*/}
            {/*        </button>*/}
            {/*    </DrawerTrigger>*/}

            {/*    <DrawerContent className="!fixed !inset-y-0 !left-20 !right-auto !w-64 !rounded-none !border-l !border-gray-200 dark:!border-gray-800 !shadow-none !bg-gray-50 dark:!bg-gray-900 !data-[state=open]:animate-none !data-[state=closed]:animate-none">*/}
            {/*        <DrawerHeader>*/}
            {/*            <DrawerTitle>Настройки</DrawerTitle>*/}
            {/*            <DrawerDescription>Главная</DrawerDescription>*/}
            {/*        </DrawerHeader>*/}
            {/*        <DrawerBody>*/}
            {/*            <ul className="flex flex-col gap-2 mt-2">*/}
            {/*                <li className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">*/}
            {/*                    Профиль*/}
            {/*                </li>*/}
            {/*                <li className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">*/}
            {/*                    Уведомления*/}
            {/*                </li>*/}
            {/*                <li className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">*/}
            {/*                    Безопасность*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </DrawerBody>*/}
            {/*    </DrawerContent>*/}
            {/*</Drawer>*/}
        </aside>
    );
}
