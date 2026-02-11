"use client";

import { useRouter, usePathname } from "next/navigation";
import { RiArrowLeftLine } from "@remixicon/react";


export function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    const goToHierarchyParent = () => {
        if (pathname === "/") {
            router.push("/");
            return;
        }

        if (
            pathname === "/nosologies" ||
            pathname === "/doctors" ||
            pathname === "/statistics" ||
            pathname === "/specialties"
        ) {
            router.push("/");
            return;
        }

        if (pathname.startsWith("/nosologies/")) {
            router.push("/nosologies");
            return;
        }

        if (pathname === "/appointments") {
            const query = new URLSearchParams(window.location.search);
            const nosologyId = query.get("nosology");
            const specialty = query.get("specialty");

            if (nosologyId) {
                router.push(`/nosologies/${nosologyId}`);
                return;
            }

            if (specialty) {
                router.push("/specialties");
                return;
            }

            router.push("/doctors");
            return;
        }

        if (pathname.startsWith("/appointments/")) {
            const query = new URLSearchParams(window.location.search);
            const doctorId = query.get("id");
            const nosologyId = query.get("nosology");
            const specialty = query.get("specialty");

            if (doctorId) {
                const query = new URLSearchParams({ id: doctorId });

                if (nosologyId) query.set("nosology", nosologyId);
                if (specialty) query.set("specialty", specialty);

                router.push(`/appointments?${query.toString()}`);
                return;
            }

            router.push("/appointments");
            return;
        }

        router.push("/");
    };

    return (
        <div className="flex items-center gap-2 ">
            <button
                onClick={goToHierarchyParent}
                className="flex items-center text-[#0085FF] hover:text-[#BADEFF] transition-colors p-0"
            >
                <RiArrowLeftLine className="w-5 h-5 flex-shrink-0" />
            </button>
        </div>
    );
}
