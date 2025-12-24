import { Nosology } from "./NosologiesTable";

export interface ColumnConfig {
    key: keyof Nosology;
    label: string;
    color?: "reverse";
    link?: boolean;
}

export const qualityColumns: ColumnConfig[] = [
    { key: "name", label: "Нозология", link: true },
    { key: "appointments", label: "Приёмы" },
    { key: "primaryAppointments", label: "Первичные приёмы" },
    { key: "repeatAppointments", label: "Повторные приёмы" },
    { key: "oukr", label: "ОУКР" },
    { key: "assignedOUKRPercent", label: "Назначено ОУКР", color: "reverse" },
    { key: "servicesCompletedPercent", label: "Выполнено" },
    { key: "overKR", label: "Назначено сверх КР" },
    { key: "totalServicesAssigned", label: "Назначено всего услуг" },
    { key: "avgServicesPerVisit", label: "Ср. назначаемость на прием" },
    { key: "appointmentsWithoutServices", label: "Приемов без назначений" },
];

export const financeColumns: ColumnConfig[] = [
    { key: "name", label: "Нозология", link: true },
    { key: "appointments", label: "Приёмы" },
    { key: "primaryAppointments", label: "Первичные приёмы" },
    { key: "repeatAppointments", label: "Повторные приёмы" },
    { key: "appointmentsWithoutServices", label: "Приемов без назначений" },
    { key: "oukr", label: "ОУКР" },
    { key: "assignedOUKRPercent", label: "Назначено ОУКР", color: "reverse" },
    { key: "totalServicesAssigned", label: "Назначено всего услуг" },
    { key: "servicesCompletedPercent", label: "Выполнено" },
    { key: "avgServicesPerVisit", label: "Ср. назначаемость на прием" },
    { key: "revenue", label: "Выручка" },
    { key: "avgCheck", label: "Ср.чек" },
    { key: "potentialRevenue", label: "Потенциальная выручка" },
    { key: "lostOUKRRevenue", label: "Недореализованные ОУКР" },
    { key: "lostOUKRPercent", label: "Доля недореализованных ОУКР", color: "reverse" },
];
