"use client";

import { useEffect } from "react";
import { dataGateway } from "@/lib/dataGateway";

export function DatasetBootstrap() {
    useEffect(() => {
        console.log("[DatasetBootstrap] mounted");

        let cancelled = false;

        async function bootstrap() {
            console.log("[DatasetBootstrap] bootstrap started");

            try {
                const meta = await dataGateway.syncIndexedDbDataset();

                console.log("[DatasetBootstrap] dataset synced:", meta);

                if (cancelled) {
                    console.log("[DatasetBootstrap] cancelled");
                }
            } catch (error) {
                console.error("[DatasetBootstrap] sync failed:", error);
            }
        }

        void bootstrap();

        return () => {
            cancelled = true;
            console.log("[DatasetBootstrap] unmounted");
        };
    }, []);

    return null;
}
