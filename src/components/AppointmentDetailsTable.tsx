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

    const renderGroup = (title: string, groupData: AppointmentDetail[]) => {
        if (groupData.length === 0) return null;

        return (
            <>
                {/* Голубая полоска с подзаголовком */}
                <TableRow className="bg-blue-100">
                    <TableCell colSpan={5} className="text-black py-1.5">
                        {title}
                    </TableCell>
                </TableRow>

                {/* Данные группы */}
                {groupData.map(d => (
                    <TableRow key={d.id}>
                        <TableCell>{d.name}</TableCell>
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
                        <TableHeaderCell>Назначено</TableHeaderCell>
                        <TableHeaderCell>Причина неназначения</TableHeaderCell>
                        <TableHeaderCell>Стоимость услуги</TableHeaderCell>
                        <TableHeaderCell>Выполнено</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderGroup("По клиническим рекомендациям", clinicalData)}
                    {renderGroup("Не по клиническим рекомендациям", nonClinicalData)}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
