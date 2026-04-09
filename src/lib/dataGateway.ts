import type { Doctor } from "@/components/DoctorsTable/DoctorsTable";
import type { Nosology } from "@/components/NosologiesTable/NosologiesTable";
import type { NosologyDoctor } from "@/components/NosologyDoctorsTable";
import type { Specialty } from "@/components/SpecialtiesTable/SpecialtiesTable";
import type { Statistic } from "@/components/StatisticsTable";
import type { Appointment } from "@/components/AppointmentsTable";
import type { AppointmentDetail } from "@/components/AppointmentDetailsTable";
import {
    clearAllDatasetsFromIndexedDb,
    ensureDatasetInIndexedDb,
    getDatasetMeta,
    writeDatasetToIndexedDb,
} from "@/lib/indexedDbDatasetStore";
import type { IndexedDbDatasetPayload } from "@/lib/indexedDbDatasetTypes";

type JsonValue = Record<string, unknown> | unknown[];

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} (${url})`);
    }

    return response.json() as Promise<T>;
}

function toIsoDate(date: string): string {
    const [day, month, year] = date.split(".");

    if (!day || !month || !year) {
        return date;
    }

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function parseMoney(value: unknown): number {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : 0;
    }

    if (typeof value !== "string") {
        return 0;
    }

    const normalized = value.replace(/[^\d,-]/g, "").replace(",", ".");

    if (!normalized) {
        return 0;
    }

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
}

export type AppointmentSummary = {
    id: string;
    date?: string;
    number?: string;
    diagnosisType?: Array<{
        mkbCode: string;
        cr_id: string;
    }>;
};

type AppointmentDetailsMap = Record<string, AppointmentDetail[]>;

type DateWindow = {
    from: string;
    to: string;
};

const DATASET_KEY = "mock-dataset";
const DATE_RANGE_STORAGE_KEY = "filters:dateRange";

function toDateOnlyIso(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getTodayIso(): string {
    return toDateOnlyIso(new Date());
}

function getFirstDayPreviousMonth(today = new Date()): Date {
    return new Date(today.getFullYear(), today.getMonth() - 1, 1);
}

function getStoredFilterFromDate(): Date | undefined {
    if (typeof window === "undefined") {
        return undefined;
    }

    const raw = localStorage.getItem(DATE_RANGE_STORAGE_KEY);

    if (!raw) {
        return undefined;
    }

    try {
        const parsed = JSON.parse(raw) as { from?: string } | null;
        if (!parsed?.from) {
            return undefined;
        }

        const parsedDate = new Date(parsed.from);
        return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    } catch {
        return undefined;
    }
}

function getRefreshDateWindow(): DateWindow {
    const today = new Date();
    const todayIso = toDateOnlyIso(today);
    const firstDayPrevMonth = getFirstDayPreviousMonth(today);
    const filterFrom = getStoredFilterFromDate();

    const requestFrom = filterFrom && filterFrom < firstDayPrevMonth
        ? filterFrom
        : firstDayPrevMonth;

    return {
        from: toDateOnlyIso(requestFrom),
        to: todayIso,
    };
}

function isSameLocalDay(leftIsoDateTime: string, rightIsoDate: string): boolean {
    const leftDate = new Date(leftIsoDateTime);
    if (Number.isNaN(leftDate.getTime())) {
        return false;
    }

    return toDateOnlyIso(leftDate) === rightIsoDate;
}

export const dataGateway = {
    // Level 1: read current raw sources (mock routes now, backend later)
    getDoctors(url = "/api/doctors") {
        return requestJson<Doctor[]>(url);
    },

    getNosologies(url = "/api/nosologies") {
        return requestJson<Nosology[]>(url);
    },

    getNosologyDoctors(nosologyId: string, url = `/api/nosologies/${nosologyId}/doctors`) {
        return requestJson<NosologyDoctor[]>(url);
    },

    getSpecialties(url = "/api/specialities") {
        return requestJson<Specialty[]>(url, { cache: "no-store" });
    },

    getStatistics(url = "/api/statistics") {
        return requestJson<Statistic[]>(url);
    },

    getAppointments(url = "/api/appointments") {
        return requestJson<Appointment[]>(url);
    },

    getAppointmentById(appointmentId: string, url = `/api/appointments/${appointmentId}`) {
        return requestJson<AppointmentDetail[]>(url);
    },

    getAppointmentDetailsMap(url = "/api/appointments/details") {
        return requestJson<AppointmentDetailsMap>(url);
    },

    getAppointmentSummaries(url: string) {
        return requestJson<AppointmentSummary[]>(url);
    },

    getRaw<T extends JsonValue>(url: string, init?: RequestInit) {
        return requestJson<T>(url, init);
    },

    // Level 2: build a unified payload for IndexedDB from raw sources
    async buildIndexedDbDatasetPayload(dateWindow?: DateWindow): Promise<IndexedDbDatasetPayload> {
        console.log("[buildDataset] start");

        const appointmentsUrl = new URL("/api/appointments", window.location.origin);
        if (dateWindow) {
            appointmentsUrl.searchParams.set("from", dateWindow.from);
            appointmentsUrl.searchParams.set("to", dateWindow.to);
        }

        const [appointments, doctors, nosologies] = await Promise.all([
            this.getAppointments(appointmentsUrl.pathname + appointmentsUrl.search),
            this.getDoctors(),
            this.getNosologies(),
        ]);

        console.log("[buildDataset] raw loaded", {
            appointmentsCount: appointments.length,
            doctorsCount: doctors.length,
            nosologiesCount: nosologies.length,
            firstAppointment: appointments[0],
            firstDoctor: doctors[0],
            firstNosology: nosologies[0],
        });

        const doctorById = new Map(doctors.map((doctor) => [doctor.id, doctor]));

        const visits = appointments.map((appointment) => {
            console.log("[buildDataset] mapping visit", appointment);

            const doctor = doctorById.get(appointment.doctorId);

            return {
                id: appointment.id,
                datasetKey: DATASET_KEY,
                number: appointment.number,
                date: toIsoDate(appointment.date),
                doctorId: appointment.doctorId,
                doctorName: doctor?.fullName ?? "Unknown doctor",
                specialtyName: doctor?.profession,
                visitType: "primary" as const,
                diagnosisType: [
                    {
                        mkbCode: appointment.diagnosisType?.[0]?.mkbCode ?? "",
                        cr_id:
                            appointment.diagnosisType?.[0]?.cr_id ??
                            `cr-${appointment.diagnosisType?.[0]?.mkbCode ?? ""}`,
                    },
                ],
                easyMed: true,
                insurance: null,
            };
        });

        console.log("[buildDataset] visits built", {
            visitsCount: visits.length,
            firstVisit: visits[0],
        });

        let appointmentDetailsMap: AppointmentDetailsMap = {};
        try {
            console.log("[buildDataset] loading details map");
            appointmentDetailsMap = await this.getAppointmentDetailsMap();
            console.log("[buildDataset] details map loaded", {
                appointmentsWithDetails: Object.keys(appointmentDetailsMap).length,
            });
        } catch (error) {
            console.error("[buildDataset] failed to load appointment details map", error);
        }

        const appointmentDetails = appointments.map((appointment) => ({
            appointmentId: appointment.id,
            details: appointmentDetailsMap[appointment.id] ?? [],
        }));

        console.log("[buildDataset] all details loaded", {
            groupsCount: appointmentDetails.length,
            firstDetailsGroup: appointmentDetails[0],
        });

        const assignments = appointmentDetails.flatMap(({ appointmentId, details }) =>
            details.map((detail, index) => {
                console.log("[buildDataset] mapping assignment", {
                    appointmentId,
                    detail,
                    index,
                });

                return {
                    id: detail.id ?? `${appointmentId}-${detail.serviceId}-${index}`,
                    datasetKey: DATASET_KEY,
                    visitId: appointmentId,
                    code: detail.code,
                    name: detail.name,
                    assigned: detail.assigned,
                    completed: detail.completed,
                    reasonNotAssigned: detail.assigned ? undefined : detail.reasonNotAssigned,
                    price: parseMoney(detail.price),
                    serviceId: detail.serviceId,
                };
            })
        );

        console.log("[buildDataset] assignments built", {
            assignmentsCount: assignments.length,
            firstAssignment: assignments[0],
        });

        const services = Array.from(
            new Map(
                assignments
                    .filter((assignment) => assignment.serviceId)
                    .map((assignment) => [
                        assignment.serviceId as string,
                        {
                            id: assignment.serviceId as string,
                            code: assignment.code ?? assignment.serviceId ?? "",
                            name: assignment.name ?? "",
                            price: assignment.price ?? 0,
                        },
                    ])
            ).values()
        );

        console.log("[buildDataset] services built", {
            servicesCount: services.length,
            firstService: services[0],
        });

        const payloadNosologies = nosologies.map((nosology) => ({
            id: nosology.id,
            name: nosology.name,
            mkbCode: [],
        }));

        console.log("[buildDataset] nosologies built", {
            nosologiesCount: payloadNosologies.length,
            firstNosology: payloadNosologies[0],
        });

        const visitDates = visits.map((visit) => visit.date).sort();
        const from = visitDates[0] ?? new Date().toISOString().slice(0, 10);
        const to = visitDates[visitDates.length - 1] ?? from;

        const payload: IndexedDbDatasetPayload = {
            meta: {
                datasetKey: DATASET_KEY,
                clinicId: "mock-clinic",
                from,
                to,
                fetchedAt: new Date().toISOString(),
                schemaVersion: 1,
            },
            visits,
            assignments,
            nosologies: payloadNosologies,
            services,
            clinicalRecommendations: [],
        };

        console.log("[buildDataset] done", {
            meta: payload.meta,
            visitsCount: payload.visits.length,
            assignmentsCount: payload.assignments.length,
            nosologiesCount: payload.nosologies.length,
            servicesCount: payload.services.length,
            clinicalRecommendationsCount: payload.clinicalRecommendations.length,
        });

        return payload;
    },

    // Level 3: sync the unified payload into IndexedDB
    async syncIndexedDbDataset() {
        try {
            const existingMeta = await getDatasetMeta(DATASET_KEY);

            if (!existingMeta) {
                const firstPayload = await this.buildIndexedDbDatasetPayload();
                await ensureDatasetInIndexedDb(firstPayload);
                return firstPayload.meta;
            }

            const todayIso = getTodayIso();
            const alreadySyncedToday = isSameLocalDay(existingMeta.fetchedAt, todayIso);

            if (alreadySyncedToday) {
                return existingMeta;
            }

            const payload = await this.buildIndexedDbDatasetPayload(getRefreshDateWindow());
            await clearAllDatasetsFromIndexedDb();
            await writeDatasetToIndexedDb(payload);
            return payload.meta;
        } catch (error) {
            console.error("BUILD FAILED, WRITING EMPTY DATASET", error);

            const emptyPayload: IndexedDbDatasetPayload = {
                meta: {
                    datasetKey: "fallback",
                    clinicId: "fallback",
                    from: new Date().toISOString().slice(0, 10),
                    to: new Date().toISOString().slice(0, 10),
                    fetchedAt: new Date().toISOString(),
                    schemaVersion: 1,
                },
                visits: [],
                assignments: [],
                nosologies: [],
                services: [],
                clinicalRecommendations: [],
            };

            await ensureDatasetInIndexedDb(emptyPayload);

            return emptyPayload.meta;
        }
    },

    async saveDatasetToIndexedDb(url: string, init?: RequestInit) {
        const payload = await requestJson<IndexedDbDatasetPayload>(url, init);
        await ensureDatasetInIndexedDb(payload);
        return payload.meta;
    },
};
