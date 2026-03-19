import { FilterOption } from "@/context/FiltersContext";

export function buildDoctorFilterOptions<T extends { id: string }>(
    doctors: T[],
    getName: (doctor: T) => string
): FilterOption[] {
    const uniqueDoctors = new Map<string, string>();

    doctors.forEach((doctor) => {
        uniqueDoctors.set(doctor.id, getName(doctor));
    });

    return Array.from(uniqueDoctors.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label, "ru"));
}
