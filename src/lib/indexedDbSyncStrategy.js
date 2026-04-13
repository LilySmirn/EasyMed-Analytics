/**
 * @typedef {{ from: string, to: string }} DateWindow
 */

/**
 * @param {Date} date
 */
export function toDateOnlyIso(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/**
 * @param {Date} [today]
 */
export function getFirstDayPreviousMonth(today = new Date()) {
    return new Date(today.getFullYear(), today.getMonth() - 1, 1);
}

/**
 * @param {Object} params
 * @param {Date} params.today
 * @param {Date | undefined} params.filterFrom
 */
export function getRefreshDateWindow({ today, filterFrom }) {
    const todayIso = toDateOnlyIso(today);
    const firstDayPrevMonth = getFirstDayPreviousMonth(today);

    const requestFrom = filterFrom && filterFrom < firstDayPrevMonth
        ? filterFrom
        : firstDayPrevMonth;

    return {
        from: toDateOnlyIso(requestFrom),
        to: todayIso,
    };
}

/**
 * @param {Object} params
 * @param {string | undefined} params.existingFetchedAtIso
 * @param {Date} params.today
 * @returns {{ shouldRefresh: boolean, reason: "first-visit" | "already-synced-today" | "stale-dataset" }}
 */
export function decideRefresh({ existingFetchedAtIso, today }) {
    if (!existingFetchedAtIso) {
        return {
            shouldRefresh: true,
            reason: "first-visit",
        };
    }

    const existingFetchedAt = new Date(existingFetchedAtIso);
    if (!Number.isNaN(existingFetchedAt.getTime()) && toDateOnlyIso(existingFetchedAt) === toDateOnlyIso(today)) {
        return {
            shouldRefresh: false,
            reason: "already-synced-today",
        };
    }

    return {
        shouldRefresh: true,
        reason: "stale-dataset",
    };
}

/**
 * @param {Object} params
 * @param {string | undefined} params.requestedFrom
 * @param {string | undefined} params.indexedDbFrom
 */
export function decideDateRangeCoverage({ requestedFrom, indexedDbFrom }) {
    if (!requestedFrom) {
        return {
            action: "skip-no-date-range",
        };
    }

    if (!indexedDbFrom) {
        return {
            action: "bootstrap",
            requestWindow: {
                from: requestedFrom,
            },
        };
    }

    if (requestedFrom >= indexedDbFrom) {
        return {
            action: "already-covered",
        };
    }

    return {
        action: "extend-backward",
        requestWindow: {
            from: requestedFrom,
            to: indexedDbFrom,
        },
    };
}
