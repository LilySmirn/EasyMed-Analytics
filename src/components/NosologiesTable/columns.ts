import { Nosology } from "./NosologiesTable";

export interface ColumnConfig {
    key: keyof Nosology;
    label: string;
    color?: "reverse" | boolean;
    link?: boolean;
}

export const qualityColumns: ColumnConfig[] = [
    { key: "name", label: "Нозология", link: true },
    { key: "appointments", label: "Приёмы" },
    { key: "primaryAppointments", label: "Первичные приёмы" },
    { key: "repeatAppointments", label: "Повторные приёмы" },
    { key: "oukr", label: "ОУКР" },
    { key: "assignedOUKRAvg", label: "% назначений ОУКР", color: true },
    { key: "servicesCompletedPercent", label: "Выполнено пациентами", color: true },
    { key: "overKR", label: "Назначено сверх КР" },
    { key: "totalServicesAssigned", label: "Назначено всего услуг" },
    { key: "avgServicesPerVisit", label: "Ср. назначаемость на прием", color: true },
    { key: "appointmentsWithoutServices", label: "Приемов без назначений" },
];

export const financeColumns: ColumnConfig[] = [
    { key: "name", label: "Нозология", link: true },
    { key: "appointments", label: "Приёмы" },
    { key: "primaryAppointments", label: "Первичные приёмы" },
    { key: "repeatAppointments", label: "Повторные приёмы" },
    { key: "appointmentsWithoutServices", label: "Приемов без назначений" },
    { key: "oukr", label: "ОУКР" },
    { key: "assignedOUKRAvg", label: "% назначений ОУКР", color: true },
    { key: "lostOUKRPercent", label: "Доля недореализованных ОУКР", color: "reverse" },
    { key: "totalServicesAssigned", label: "Назначено всего услуг" },
    { key: "servicesCompletedPercent", label: "Выполнено пациентами", color: true },
    { key: "avgServicesPerVisit", label: "Ср. назначаемость на прием", color: true },
    { key: "revenue", label: "Выручка" },
    { key: "avgCheck", label: "Ср.чек" },
    { key: "potentialRevenue", label: "Потенциальная выручка" },
    { key: "lostOUKRRevenue", label: "Недореализованные ОУКР" },
    { key: "patientRevenueLoss", label: "Не выполнено пациентами", color: "reverse" },
];
