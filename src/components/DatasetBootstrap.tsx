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
                const url = "/api/dataset";
                console.log("[DatasetBootstrap] requesting:", url);

                const meta = await dataGateway.saveDatasetToIndexedDb(url);

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
