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
    name: string;
    mandatoryOukr?: boolean;
    assigned: boolean;
    reason: string;
    cost: string;
    done: boolean;
    clinical: boolean;
}

interface Props {
    data: AppointmentDetail[];
}

export function AppointmentDetailsTable({ data }: Props) {
    const clinicalData = data.filter(d => d.clinical);
    const nonClinicalData = data.filter(d => !d.clinical);

    const renderGroup = (title: string, groupData: AppointmentDetail[], showMandatoryColumn: boolean) => {
        if (groupData.length === 0) return null;

        return (
            <>
                <TableRow className="bg-blue-100 [&>td]:bg-blue-100">
                    <TableCell colSpan={6} className="text-black py-1.5">
                        {title}
                    </TableCell>
                </TableRow>

                {groupData.map(d => (
                    <TableRow key={d.id}>
                        <TableCell colSpan={showMandatoryColumn ? 1 : 2}>{d.name}</TableCell>
                        {showMandatoryColumn && <TableCell className="text-center">{d.mandatoryOukr ? "✓" : "—"}</TableCell>}
                        <TableCell>{d.assigned ? "Да" : "Нет"}</TableCell>
                        <TableCell>{d.assigned ? "-" : d.reason}</TableCell>
                        <TableCell>{d.cost}</TableCell>
                        <TableCell>{d.done ? "Да" : "Нет"}</TableCell>
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
                        <TableHeaderCell className="text-center">Обязательные ОУКР</TableHeaderCell>
                        <TableHeaderCell>Назначено</TableHeaderCell>
                        <TableHeaderCell>Причина неназначения</TableHeaderCell>
                        <TableHeaderCell>Стоимость услуги</TableHeaderCell>
                        <TableHeaderCell>Выполнено пациентами</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderGroup("По клиническим рекомендациям", clinicalData, true)}
                    {renderGroup("Не по клиническим рекомендациям", nonClinicalData, false)}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
