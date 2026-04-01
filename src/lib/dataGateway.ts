import type { Doctor } from "@/components/DoctorsTable/DoctorsTable";
import type { Nosology } from "@/components/NosologiesTable/NosologiesTable";
import type { NosologyDoctor } from "@/components/NosologyDoctorsTable";
import type { Specialty } from "@/components/SpecialtiesTable/SpecialtiesTable";
import type { Statistic } from "@/components/StatisticsTable";
import type { Appointment } from "@/components/AppointmentsTable";
import type { AppointmentDetail } from "@/components/AppointmentDetailsTable";

type JsonValue = Record<string, unknown> | unknown[];

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} (${url})`);
    }

    return response.json() as Promise<T>;
}

export type AppointmentSummary = {
    id: string;
    date?: string;
    number?: string;
    mkb?: string;
};

export const dataGateway = {
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
};
