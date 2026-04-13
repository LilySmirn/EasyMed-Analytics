import test from "node:test";
import assert from "node:assert/strict";

import {
    decideDateRangeCoverage,
    decideRefresh,
    getRefreshDateWindow,
} from "./indexedDbSyncStrategy.js";

test("first visit: should refresh from first day of previous month to today", () => {
    const today = new Date("2026-04-13T10:00:00.000Z");

    const decision = decideRefresh({ existingFetchedAtIso: undefined, today });
    const window = getRefreshDateWindow({ today, filterFrom: undefined });

    assert.equal(decision.shouldRefresh, true);
    assert.equal(decision.reason, "first-visit");
    assert.deepEqual(window, { from: "2026-03-01", to: "2026-04-13" });
});

test("repeat visit today: should not refresh indexeddb", () => {
    const today = new Date("2026-04-13T10:00:00.000Z");

    const decision = decideRefresh({
        existingFetchedAtIso: "2026-04-13T00:05:00.000Z",
        today,
    });

    assert.equal(decision.shouldRefresh, false);
    assert.equal(decision.reason, "already-synced-today");
});

test("repeat visit not today + filter starts earlier than first day previous month", () => {
    const today = new Date("2026-04-13T10:00:00.000Z");

    const decision = decideRefresh({
        existingFetchedAtIso: "2026-04-12T11:00:00.000Z",
        today,
    });

    const window = getRefreshDateWindow({
        today,
        filterFrom: new Date("2026-01-15T00:00:00.000Z"),
    });

    assert.equal(decision.shouldRefresh, true);
    assert.equal(decision.reason, "stale-dataset");
    assert.deepEqual(window, { from: "2026-01-15", to: "2026-04-13" });
});

test("repeat visit not today + filter starts later than first day previous month", () => {
    const today = new Date("2026-04-13T10:00:00.000Z");

    const window = getRefreshDateWindow({
        today,
        filterFrom: new Date("2026-03-20T00:00:00.000Z"),
    });

    assert.deepEqual(window, { from: "2026-03-01", to: "2026-04-13" });
});

test("filter change: no new date interval (date not provided) => skip loading", () => {
    const coverage = decideDateRangeCoverage({
        requestedFrom: undefined,
        indexedDbFrom: "2026-03-01",
    });

    assert.deepEqual(coverage, { action: "skip-no-date-range" });
});

test("filter change: new range is inside indexeddb interval => no extra loading", () => {
    const coverage = decideDateRangeCoverage({
        requestedFrom: "2026-03-20",
        indexedDbFrom: "2026-03-01",
    });

    assert.deepEqual(coverage, { action: "already-covered" });
});

test("filter change: new range starts earlier than indexeddb => load missing head and extend", () => {
    const coverage = decideDateRangeCoverage({
        requestedFrom: "2026-01-15",
        indexedDbFrom: "2026-03-01",
    });

    assert.deepEqual(coverage, {
        action: "extend-backward",
        requestWindow: {
            from: "2026-01-15",
            to: "2026-03-01",
        },
    });
});

test("filter change: first date-based request with empty indexeddb => bootstrap", () => {
    const coverage = decideDateRangeCoverage({
        requestedFrom: "2026-02-01",
        indexedDbFrom: undefined,
    });

    assert.deepEqual(coverage, {
        action: "bootstrap",
        requestWindow: {
            from: "2026-02-01",
        },
    });
});
