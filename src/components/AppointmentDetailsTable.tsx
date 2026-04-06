"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    TableRoot,
} from "@/components/Table";

export interface AppointmentDetail {
    id: string;
    serviceId: string;
    code: string;
    name: string;
    assigned: boolean;
    reasonNotAssigned: string;
    price: string;
    completed: boolean;
    isClinicalRecommendation: boolean;
    isRequiredByClinicalRecommendation: boolean;
}

interface Props {
    data: AppointmentDetail[];
}

export function AppointmentDetailsTable({ data }: Props) {
    const mandatoryServicesData = data.filter(d => d.isClinicalRecommendation && d.isRequiredByClinicalRecommendation);
    const indicationServicesData = data.filter(d => d.isClinicalRecommendation && !d.isRequiredByClinicalRecommendation);
    const nonClinicalData = data.filter(d => !d.isClinicalRecommendation);

    const renderGroup = (title: string, groupData: AppointmentDetail[]) => {
        if (groupData.length === 0) return null;

        return (
            <>
                <TableRow className="bg-blue-100 [&>td]:bg-blue-100">
                    <TableCell colSpan={5} className="text-black py-1.5">
                        {title}
                    </TableCell>
                </TableRow>

                {groupData.map(d => (
                    <TableRow key={d.id}>
                        <TableCell>{d.name}</TableCell>
                        <TableCell className="text-center">{d.assigned ? "Да" : "Нет"}</TableCell>
                        <TableCell className="text-center">{d.assigned ? "-" : d.reasonNotAssigned}</TableCell>
                        <TableCell className="text-center">{d.price}</TableCell>
                        <TableCell className="text-center">
                            {d.assigned ? (d.completed ? "Да" : "Нет") : "-"}
                        </TableCell>
                    </TableRow>
                    ))}
            </>
    );
    };

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Название назначения/услуги</TableHeaderCell>
                        <TableHeaderCell className="text-center">Назначено</TableHeaderCell>
                        <TableHeaderCell className="text-center">Причина неназначения</TableHeaderCell>
                        <TableHeaderCell className="text-center">Стоимость услуги</TableHeaderCell>
                        <TableHeaderCell className="text-center">Выполнено пациентами</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderGroup("Обязательные услуги", mandatoryServicesData)}
                    {renderGroup("Услуги по показаниям", indicationServicesData)}
                    {renderGroup("Не по клиническим рекомендациям", nonClinicalData)}
                </TableBody>
            </Table>
        </TableRoot>
);
}
