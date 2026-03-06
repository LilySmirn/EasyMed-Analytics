import { Specialty } from "./SpecialtiesTable";

export interface ColumnConfig {
    key: keyof Specialty;
    label: string;
    link?: boolean;
    color?: "reverse" | boolean;
}

/* =======================
   КАЧЕСТВО ЛЕЧЕНИЯ
======================= */

export const qualityColumns: ColumnConfig[] = [
    { key: "name", label: "Название специальности", link: true },
    { key: "appointments", label: "Количество приёмов" },
    { key: "noServices", label: "Приемов без назначений" },
    { key: "requiredKR", label: "ОУКР" },
    { key: "assignedOUKRAvg", label: "Назначено ОУКР" },
    { key: "servicesCompletedPercent", label: "Выполнено пациентами", color: true },
    {
        key: "deviationOUKRPercent",
        label: "Отклонение ОУКР",
        color: "reverse",
    },
    { key: "avgOUKRAssign", label: "Ср. назначаемость по ОУКР" },
    { key: "avgNosologyAssign", label: "Ср. назначаемость по нозологии" },
    { key: "totalServices", label: "Назначено всего услуг" },
    { key: "overKR", label: "Назначено сверх КР" },
];

/* =======================
   ФИНАНСЫ
======================= */

export const financeColumns: ColumnConfig[] = [
    { key: "name", label: "Название специальности", link: true },
    { key: "appointments", label: "Приёмы" },
    { key: "noServices", label: "Приемов без назначений" },
    { key: "requiredKR", label: "ОУКР" },
    { key: "totalServices", label: "Назначено всего услуг" },
    { key: "servicesCompletedPercent", label: "Выполнено пациентами", color: true },
    { key: "assignedOUKRAvg", label: "Назначено ОУКР" },
    { key: "lostOUKRRevenue", label: "Недореализованные ОУКР" },
    { key: "avgOUKRAssign", label: "Ср. назначаемость по ОУКР" },
    {
        key: "lostOUKRPercent",
        label: "Доля недореализованных ОУКР",
        color: "reverse",
    },
    { key: "avgNosologyAssign", label: "Ср. назначаемость по нозологии" },
    { key: "revenue", label: "Выручка" },
    { key: "avgBill", label: "Ср.чек" },
    { key: "potentialRevenue", label: "Потенциальная выручка" },
];
