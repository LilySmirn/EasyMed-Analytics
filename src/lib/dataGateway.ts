import type { Doctor } from "@/components/DoctorsTable/DoctorsTable";
import type { Nosology } from "@/components/NosologiesTable/NosologiesTable";
import type { NosologyDoctor } from "@/components/NosologyDoctorsTable";
import type { Specialty } from "@/components/SpecialtiesTable/SpecialtiesTable";
import type { Statistic } from "@/components/StatisticsTable";
import type { Appointment } from "@/components/AppointmentsTable";
import type { AppointmentDetail } from "@/components/AppointmentDetailsTable";
import { ensureDatasetInIndexedDb } from "@/lib/indexedDbDatasetStore";
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
    mkb?: string;
};

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

    getAppointmentSummaries(url: string) {
        return requestJson<AppointmentSummary[]>(url);
    },

    getRaw<T extends JsonValue>(url: string, init?: RequestInit) {
        return requestJson<T>(url, init);
    },

    // Level 2: build a unified payload for IndexedDB from raw sources
    async buildIndexedDbDatasetPayload(): Promise<IndexedDbDatasetPayload> {
        console.log("[buildDataset] start");

        const [appointments, doctors, nosologies] = await Promise.all([
            this.getAppointments(),
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
                datasetKey: "mock-dataset",
                number: appointment.number,
                date: toIsoDate(appointment.date),
                doctorId: appointment.doctorId,
                doctorName: doctor?.fullName ?? "Unknown doctor",
                specialtyName: doctor?.profession,
                visitType: "primary" as const,
                diagnosisType: [
                    {
                        mkbCode: appointment.mkb,
                        cr_id: `cr-${appointment.mkb}`,
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

        const appointmentDetails = await Promise.all(
            appointments.map(async (appointment) => {
                try {
                    console.log("[buildDataset] loading details for", appointment.id);

                    const details = await this.getAppointmentById(appointment.id);

                    console.log("[buildDataset] details loaded", appointment.id, details);

                    return {
                        appointmentId: appointment.id,
                        details,
                    };
                } catch (error) {
                    console.error("[buildDataset] failed to load appointment details", appointment.id, error);

                    return {
                        appointmentId: appointment.id,
                        details: [],
                    };
                }
            })
        );

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
                    id: `${appointmentId}-${detail.id}-${index}`,
                    datasetKey: "mock-dataset",
                    visitId: appointmentId,
                    code: detail.id,
                    name: detail.name,
                    assigned: detail.assigned,
                    completed: detail.done,
                    reasonNotAssigned: detail.assigned ? undefined : detail.reason,
                    price: parseMoney(detail.cost),
                    serviceId: detail.id,
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
                datasetKey: "mock-dataset",
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
            const payload = await this.buildIndexedDbDatasetPayload();
            await ensureDatasetInIndexedDb(payload);
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
