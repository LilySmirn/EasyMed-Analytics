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
}

interface Props {
    data: AppointmentDetail[];
}

export function AppointmentDetailsTable({ data }: Props) {
    return (
        <TableRoot>
            <Table>
                {/*<TableCaption>Детали приёма</TableCaption>*/}
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
                    {data.map((d) => (
                        <TableRow key={d.id}>
                            <TableCell>{d.name}</TableCell>
                            <TableCell>{d.assigned ? "Да" : "Нет"}</TableCell>
                            <TableCell>{d.assigned ? "-" : d.reason}</TableCell>
                            <TableCell>{d.cost}</TableCell>
                            <TableCell>{d.done ? "Да" : "Нет"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
