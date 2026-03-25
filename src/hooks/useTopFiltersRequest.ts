"use client";

import { useEffect, useMemo, useRef } from "react";
import type { DateRange } from "react-day-picker";
import type { FiltersState } from "@/context/FiltersContext";
import {
    buildTopFiltersPayload,
    createTopFiltersRequestKey,
    type RequestPayload,
    type RequestValue,
} from "@/utils/topFiltersRequest";

type ExtraParams = Record<string, RequestValue | null | undefined>;

interface UseTopFiltersRequestOptions {
    filters: FiltersState;
    dateRange?: DateRange;
    extraParams?: ExtraParams;
    enabled?: boolean;
    onRequest: (payload: RequestPayload) => void | Promise<void>;
}

export function useTopFiltersRequest({
                                         filters,
                                         dateRange,
                                         extraParams = {},
                                         enabled = true,
                                         onRequest,
                                     }: UseTopFiltersRequestOptions) {
    const requestKey = useMemo(
        () => createTopFiltersRequestKey(filters, { dateRange, extraParams }),
        [filters, dateRange, extraParams]
    );

    const payload = useMemo(
        () => buildTopFiltersPayload(filters, { dateRange, extraParams }),
        [filters, dateRange, extraParams]
    );

    const lastRequestKeyRef = useRef<string | null>(null);

    useEffect(() => {
        if (!enabled) return;

        if (lastRequestKeyRef.current === requestKey) {
            return;
        }

        lastRequestKeyRef.current = requestKey;
        void onRequest(payload);
    }, [enabled, onRequest, payload, requestKey]);

    return payload;
}
