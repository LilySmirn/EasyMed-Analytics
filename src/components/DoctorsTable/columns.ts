import { Doctor } from "./DoctorsTable";

export type ColumnConfig = {
    label: string;
    key: keyof Doctor;
    sortable?: boolean;
    color?: "reverse" | boolean;
    link?: boolean;
    minWidth?: string; // добавили
    maxWidth?: string; // добавили
};

// Колонки качества лечения (КЛ)
export const qualityColumns: ColumnConfig[] = [
    { label: "ФИО", key: "fullName", sortable: true, link: true, minWidth: "min-w-[110px]", maxWidth: "max-w-[160px]"  },
    { label: "Приёмы", key: "appointments", sortable: true },
    { label: "Первичные приёмы", key: "primary", sortable: true },
    { label: "Повторные приёмы", key: "repeatAppointments", sortable: true },
    { label: "ОУКР", key: "requiredKR", sortable: true },
    { label: "% назначений ОУКР", key: "assignedOUKRAvg", sortable: true, color: true },
    { label: "Выполнено пациентами", key: "servicesCompletedPercent", sortable: true, color: true },
    { label: "Назначено сверх КР", key: "overKR", sortable: true },
    { label: "Назначено всего услуг", key: "totalServices", sortable: true },
    { label: "Ср. назначаемость на прием", key: "avgServicesPerVisit", sortable: true, color: true },
    { label: "Приемов без назначений", key: "noServices", sortable: true },
];

// Колонки финансовых показателей (ФП)
export const financeColumns: ColumnConfig[] = [
    { label: "ФИО", key: "fullName", sortable: true, link: true, minWidth: "min-w-[110px]", maxWidth: "max-w-[160px]" },
    { label: "Приёмы", key: "appointments", sortable: true },
    { label: "Первичные приёмы", key: "primary", sortable: true },
    { label: "Повторные приёмы", key: "repeatAppointments", sortable: true },
    { label: "Приемов без назначений", key: "noServices", sortable: true },
    { label: "ОУКР", key: "requiredKR", sortable: true },
    { label: "% назначений ОУКР", key: "assignedOUKRAvg", sortable: true, color: true },
    { label: "Доля недореализованных ОУКР", key: "lostOUKRPercent", sortable: true, color: "reverse" },
    { label: "Назначено всего услуг", key: "totalServices", sortable: true },
    { label: "Выполнено пациентами", key: "servicesCompletedPercent", sortable: true, color: true },
    { label: "Ср. назначаемость на прием", key: "avgServicesPerVisit", sortable: true, color: true },
    { label: "Выручка", key: "revenue", sortable: true },
    { label: "Ср.чек", key: "avgBill", sortable: true },
    { label: "Потенциальная выручка", key: "potentialRevenue", sortable: true },
    { label: "Недореализованные ОУКР", key: "lostOUKRRevenue", sortable: true },
];
