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
    TableCaption,
} from "@/components/Table";

export interface Appointment {
    id: string;
    doctorId: string;
    date: string;
    number: string;
    requiredServices: number;
    assignedRequired: number;
    assignmentPercent: number;
    completionPercent: number;
    deviationPercent: number;
    revenue: string;
    lostRevenue: string;
}

interface AppointmentsTableProps {
    data: Appointment[];
}

export function AppointmentsTable({ data }: AppointmentsTableProps) {
    return (
        <TableRoot>
            <Table>
                <TableCaption>Приёмы</TableCaption>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Дата / № приёма</TableHeaderCell>
                        <TableHeaderCell>Кол-во обяз. услуг</TableHeaderCell>
                        <TableHeaderCell>Назначено обяз.</TableHeaderCell>
                        <TableHeaderCell>% назначения</TableHeaderCell>
                        <TableHeaderCell>% выполнения</TableHeaderCell>
                        <TableHeaderCell>% отклонений</TableHeaderCell>
                        <TableHeaderCell>Выручка</TableHeaderCell>
                        <TableHeaderCell>Потерянная выручка</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((a) => (
                        <TableRow key={a.id}>
                            <TableCell>{a.date} / {a.number}</TableCell>
                            <TableCell>{a.requiredServices}</TableCell>
                            <TableCell>{a.assignedRequired}</TableCell>
                            <TableCell>{a.assignmentPercent}%</TableCell>
                            <TableCell>{a.completionPercent}%</TableCell>
                            <TableCell>{a.deviationPercent}%</TableCell>
                            <TableCell>{a.revenue}</TableCell>
                            <TableCell>{a.lostRevenue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
