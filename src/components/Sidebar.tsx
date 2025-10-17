"use client";

import { useState } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
} from "@/components/Drawer";

import { Tooltip } from "@/components/Tooltip";
import { RiDashboardLine, RiLineChartLine } from "@remixicon/react";

export function Sidebar() {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);

    return (
        <aside className="relative flex flex-col items-center bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-100 py-6 w-20 min-h-screen border-r border-gray-200 dark:border-gray-800">
            {/* Кнопка 1 */}
            <Tooltip content="Панель управления" side="right">
            <Drawer open={openDrawer === "home"} onOpenChange={(v) => setOpenDrawer(v ? "home" : null)}>
                <DrawerTrigger asChild>
                    <button className="p-3 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                        <RiDashboardLine className="w-6 h-6" />
                    </button>
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Главная</DrawerTitle>
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
            </Tooltip>

            {/* Кнопка 2 */}
            <Tooltip content="Графики" side="right">
            <Drawer open={openDrawer === "settings"} onOpenChange={(v) => setOpenDrawer(v ? "settings" : null)}>
                <DrawerTrigger asChild>
                    <button className="p-3 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
                        <RiLineChartLine className="w-6 h-6" />
                    </button>
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Настройки</DrawerTitle>
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
            </Tooltip>
        </aside>
    );
}
