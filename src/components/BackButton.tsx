"use client";

import { useRouter, usePathname } from "next/navigation";
import { RiArrowLeftLine } from "@remixicon/react";


export function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    // является ли страница "главного уровня"
    const isTopLevelPage =
        pathname === "/nosologies" ||
        pathname === "/doctors" ||
        pathname === "/statistics";

    const handleBack = () => {
        if (isTopLevelPage) {
            router.push("/"); // на главную
        } else {
            router.back(); // на предыдущую
        }
    };

    return (
        <div className="flex items-center gap-2 ">
            <button
                onClick={handleBack}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors p-0"
            >
                <RiArrowLeftLine className="w-5 h-5 flex-shrink-0" />
            </button>
        </div>
    );
}
