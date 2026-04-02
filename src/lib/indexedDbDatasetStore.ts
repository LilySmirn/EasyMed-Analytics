import type {
    Assignment,
    ClinicalRecommendation,
    DatasetMeta,
    IndexedDbDatasetPayload,
    Nosology,
    Service,
    Visit,
} from "@/lib/indexedDbDatasetTypes";

const DB_NAME = "easymed-analytics";
const DB_VERSION = 2;

const STORES = {
    meta: "datasetMeta",
    visits: "visits",
    assignments: "assignments",
    nosologies: "nosologies",
    services: "services",
    clinicalRecommendations: "clinicalRecommendations",
} as const;

function assertBrowserIndexedDb(): IDBFactory {
    if (typeof window === "undefined" || !window.indexedDB) {
        throw new Error("IndexedDB is only available in the browser.");
    }

    return window.indexedDB;
}

function requestToPromise<T = void>(request: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function transactionDone(tx: IDBTransaction): Promise<void> {
    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
    });
}

function openDb(): Promise<IDBDatabase> {
    const indexedDb = assertBrowserIndexedDb();

    return new Promise((resolve, reject) => {
        const request = indexedDb.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(STORES.meta)) {
                db.createObjectStore(STORES.meta, { keyPath: "datasetKey" });
            }

            if (!db.objectStoreNames.contains(STORES.visits)) {
                const store = db.createObjectStore(STORES.visits, { keyPath: "id" });
                store.createIndex("datasetKey", "datasetKey", { unique: false });
                store.createIndex("date", "date", { unique: false });
                store.createIndex("doctorId", "doctorId", { unique: false });
            }

            if (!db.objectStoreNames.contains(STORES.assignments)) {
                const store = db.createObjectStore(STORES.assignments, { keyPath: "id" });
                store.createIndex("datasetKey", "datasetKey", { unique: false });
                store.createIndex("visitId", "visitId", { unique: false });
                store.createIndex("serviceId", "serviceId", { unique: false });
            }

            if (!db.objectStoreNames.contains(STORES.nosologies)) {
                db.createObjectStore(STORES.nosologies, { keyPath: "id" });
            }

            if (!db.objectStoreNames.contains(STORES.services)) {
                db.createObjectStore(STORES.services, { keyPath: "id" });
            }

            if (!db.objectStoreNames.contains(STORES.clinicalRecommendations)) {
                db.createObjectStore(STORES.clinicalRecommendations, { keyPath: "id" });
            }
        };

        request.onblocked = () => {
            console.warn("IndexedDB upgrade blocked. Close other tabs with this app.");
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

function isSameEntity<T>(a: T, b: T): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

async function getDatasetMetaInternal(
    db: IDBDatabase,
    datasetKey: string
): Promise<DatasetMeta | undefined> {
    const tx = db.transaction(STORES.meta, "readonly");
    const store = tx.objectStore(STORES.meta);
    const result = await requestToPromise(store.get(datasetKey));
    await transactionDone(tx);
    return result as DatasetMeta | undefined;
}

async function getAllByDatasetKey<T>(
    db: IDBDatabase,
    storeName: (typeof STORES)[keyof typeof STORES],
    datasetKey: string
): Promise<T[]> {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const index = store.index("datasetKey");
    const result = await requestToPromise(index.getAll(IDBKeyRange.only(datasetKey)));
    await transactionDone(tx);
    return result as T[];
}

type EntityWithId = { id: string };

function buildDiff<T extends EntityWithId>(current: T[], incoming: T[]) {
    const currentMap = new Map(current.map((item) => [item.id, item]));
    const incomingMap = new Map(incoming.map((item) => [item.id, item]));

    const toDelete: string[] = [];
    const toUpsert: T[] = [];

    for (const currentItem of current) {
        if (!incomingMap.has(currentItem.id)) {
            toDelete.push(currentItem.id);
        }
    }

    for (const incomingItem of incoming) {
        const existingItem = currentMap.get(incomingItem.id);

        if (!existingItem || !isSameEntity(existingItem, incomingItem)) {
            toUpsert.push(incomingItem);
        }
    }

    return { toDelete, toUpsert };
}

export async function writeDatasetToIndexedDb(payload: IndexedDbDatasetPayload): Promise<void> {
    const db = await openDb();

    try {
        const tx = db.transaction(Object.values(STORES), "readwrite");

        const metaStore = tx.objectStore(STORES.meta);
        const visitsStore = tx.objectStore(STORES.visits);
        const assignmentsStore = tx.objectStore(STORES.assignments);
        const nosologiesStore = tx.objectStore(STORES.nosologies);
        const servicesStore = tx.objectStore(STORES.services);
        const crStore = tx.objectStore(STORES.clinicalRecommendations);

        // meta
        metaStore.put(payload.meta);

        // visits / assignments:
        // удаляем только записи текущего datasetKey и записываем заново
        const visitsByDatasetKey = visitsStore.index("datasetKey");
        const assignmentsByDatasetKey = assignmentsStore.index("datasetKey");

        const visitsKeys = await requestToPromise(
            visitsByDatasetKey.getAllKeys(IDBKeyRange.only(payload.meta.datasetKey))
        );
        const assignmentsKeys = await requestToPromise(
            assignmentsByDatasetKey.getAllKeys(IDBKeyRange.only(payload.meta.datasetKey))
        );

        (visitsKeys as IDBValidKey[]).forEach((key) => visitsStore.delete(key));
        (assignmentsKeys as IDBValidKey[]).forEach((key) => assignmentsStore.delete(key));

        payload.visits.forEach((visit) => visitsStore.put(visit));
        payload.assignments.forEach((assignment) => assignmentsStore.put(assignment));

        // справочники пока просто перезаписываем целиком
        nosologiesStore.clear();
        servicesStore.clear();
        crStore.clear();

        payload.nosologies.forEach((item) => nosologiesStore.put(item));
        payload.services.forEach((item) => servicesStore.put(item));
        payload.clinicalRecommendations.forEach((item) => crStore.put(item));

        await transactionDone(tx);
    } finally {
        db.close();
    }
}

export async function syncDatasetToIndexedDb(payload: IndexedDbDatasetPayload): Promise<void> {
    const db = await openDb();

    try {
        const currentVisits = await getAllByDatasetKey<Visit>(db, STORES.visits, payload.meta.datasetKey);
        const currentAssignments = await getAllByDatasetKey<Assignment>(
            db,
            STORES.assignments,
            payload.meta.datasetKey
        );

        const visitsDiff = buildDiff(currentVisits, payload.visits);
        const assignmentsDiff = buildDiff(currentAssignments, payload.assignments);

        const tx = db.transaction(Object.values(STORES), "readwrite");

        const metaStore = tx.objectStore(STORES.meta);
        const visitsStore = tx.objectStore(STORES.visits);
        const assignmentsStore = tx.objectStore(STORES.assignments);
        const nosologiesStore = tx.objectStore(STORES.nosologies);
        const servicesStore = tx.objectStore(STORES.services);
        const crStore = tx.objectStore(STORES.clinicalRecommendations);

        // meta обновляем всегда
        metaStore.put(payload.meta);

        // visits diff
        visitsDiff.toDelete.forEach((id) => visitsStore.delete(id));
        visitsDiff.toUpsert.forEach((item) => visitsStore.put(item));

        // assignments diff
        assignmentsDiff.toDelete.forEach((id) => assignmentsStore.delete(id));
        assignmentsDiff.toUpsert.forEach((item) => assignmentsStore.put(item));

        // справочники пока просто обновляем целиком
        nosologiesStore.clear();
        servicesStore.clear();
        crStore.clear();

        payload.nosologies.forEach((item) => nosologiesStore.put(item));
        payload.services.forEach((item) => servicesStore.put(item));
        payload.clinicalRecommendations.forEach((item) => crStore.put(item));

        await transactionDone(tx);
    } finally {
        db.close();
    }
}

export async function ensureDatasetInIndexedDb(payload: IndexedDbDatasetPayload): Promise<void> {
    const db = await openDb();

    try {
        const existingMeta = await getDatasetMetaInternal(db, payload.meta.datasetKey);

        if (!existingMeta) {
            await writeDatasetToIndexedDb(payload);
            return;
        }
    } finally {
        db.close();
    }

    await syncDatasetToIndexedDb(payload);
}

export async function getDatasetMeta(datasetKey: string): Promise<DatasetMeta | undefined> {
    const db = await openDb();

    try {
        return await getDatasetMetaInternal(db, datasetKey);
    } finally {
        db.close();
    }
}

export async function clearAllDatasetsFromIndexedDb(): Promise<void> {
    const db = await openDb();

    try {
        const tx = db.transaction(Object.values(STORES), "readwrite");

        Object.values(STORES).forEach((storeName) => {
            tx.objectStore(storeName).clear();
        });

        await transactionDone(tx);
    } finally {
        db.close();
    }
}

export async function debugIndexedDbCounts(): Promise<Record<string, number>> {
    const db = await openDb();

    try {
        const tx = db.transaction(Object.values(STORES), "readonly");

        const entries = await Promise.all(
            Object.values(STORES).map(async (storeName) => {
                const count = await requestToPromise(tx.objectStore(storeName).count());
                return [storeName, count] as const;
            })
        );

        await transactionDone(tx);

        return Object.fromEntries(entries);
    } finally {
        db.close();
    }
}

export async function debugDataset(datasetKey: string): Promise<{
    meta?: DatasetMeta;
    visits: Visit[];
    assignments: Assignment[];
    nosologies: Nosology[];
    services: Service[];
    clinicalRecommendations: ClinicalRecommendation[];
}> {
    const db = await openDb();

    try {
        const meta = await getDatasetMetaInternal(db, datasetKey);
        const visits = await getAllByDatasetKey<Visit>(db, STORES.visits, datasetKey);
        const assignments = await getAllByDatasetKey<Assignment>(db, STORES.assignments, datasetKey);

        const tx = db.transaction(
            [STORES.nosologies, STORES.services, STORES.clinicalRecommendations],
            "readonly"
        );

        const nosologies = (await requestToPromise(
            tx.objectStore(STORES.nosologies).getAll()
        )) as Nosology[];

        const services = (await requestToPromise(
            tx.objectStore(STORES.services).getAll()
        )) as Service[];

        const clinicalRecommendations = (await requestToPromise(
            tx.objectStore(STORES.clinicalRecommendations).getAll()
        )) as ClinicalRecommendation[];

        await transactionDone(tx);

        return {
            meta,
            visits,
            assignments,
            nosologies,
            services,
            clinicalRecommendations,
        };
    } finally {
        db.close();
    }
}
