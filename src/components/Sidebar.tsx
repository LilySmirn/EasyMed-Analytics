"use client";

import { useState } from "react";
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
        <aside className="relative flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-6 w-20 min-h-screen border-r border-gray-200 dark:border-gray-800">
            {/* Иконка 1 — Дом */}
            <Drawer open={openDrawer === "home"} onOpenChange={(v) => setOpenDrawer(v ? "home" : null)}>
                <DrawerTrigger asChild>
                    <button className="p-3 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                        <RiHome5Line className="w-6 h-6" />
                    </button>
                </DrawerTrigger>

                <DrawerContent className="!fixed !inset-y-0 !left-20 !right-auto !w-64 !rounded-none !border-l !border-gray-200 dark:!border-gray-800 !shadow-none !bg-gray-50 dark:!bg-gray-900 !data-[state=open]:animate-none !data-[state=closed]:animate-none">
                    <DrawerHeader>
                        <DrawerTitle>Главная</DrawerTitle>
                        <DrawerDescription>Главная</DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <ul className="flex flex-col gap-2 mt-2">
                            <li className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                Обзор
                            </li>
                            <li className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                Статистика
                            </li>
                            <li className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                Аналитика
                            </li>
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Иконка 2 — Настройки */}
            <Drawer open={openDrawer === "settings"} onOpenChange={(v) => setOpenDrawer(v ? "settings" : null)}>
                <DrawerTrigger asChild>
                    <button className="p-3 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                        <RiSettings3Line className="w-6 h-6" />
                    </button>
                </DrawerTrigger>

                <DrawerContent className="!fixed !inset-y-0 !left-20 !right-auto !w-64 !rounded-none !border-l !border-gray-200 dark:!border-gray-800 !shadow-none !bg-gray-50 dark:!bg-gray-900 !data-[state=open]:animate-none !data-[state=closed]:animate-none">
                    <DrawerHeader>
                        <DrawerTitle>Настройки</DrawerTitle>
                        <DrawerDescription>Главная</DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <ul className="flex flex-col gap-2 mt-2">
                            <li className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                Профиль
                            </li>
                            <li className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                Уведомления
                            </li>
                            <li className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded px-2 py-1 cursor-pointer">
                                Безопасность
                            </li>
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </aside>
    );
}
