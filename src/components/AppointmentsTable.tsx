"use client";

import Link from "next/link";
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
import { getPercentColor } from "@/utils/getPercentColor";
import { useSearchParams } from "next/navigation";

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
    mkb: string;
}

interface AppointmentsTableProps {
    data: Appointment[];
}

export function AppointmentsTable({ data }: AppointmentsTableProps) {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get("id");
    const nosologyId = searchParams.get("nosology");
    const specialty = searchParams.get("specialty");

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Дата / № приёма</TableHeaderCell>
                        <TableHeaderCell>МКБ</TableHeaderCell>
                        <TableHeaderCell>Кол-во обяз. услуг</TableHeaderCell>
                        <TableHeaderCell>Назначено обяз.</TableHeaderCell>
                        <TableHeaderCell>Процент назначений ОУКР</TableHeaderCell>
                        <TableHeaderCell>Выполнено пациентами</TableHeaderCell>
                        <TableHeaderCell>Выручка</TableHeaderCell>
                        <TableHeaderCell>Потерянная выручка</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((a, index) => (
                        <TableRow key={a.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <TableCell>
                                <Link
                                    href={{
                                        pathname: `/appointments/${a.id}`,
                                        query: {
                                            ...(doctorId ? { id: doctorId } : {}),
                                            ...(nosologyId ? { nosology: nosologyId } : {}),
                                            ...(specialty ? { specialty } : {}),
                                        },
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    {a.date} / {a.number}
                                </Link>
                            </TableCell>
                            <TableCell>{a.mkb}</TableCell>
                            <TableCell>{a.requiredServices}</TableCell>
                            <TableCell>{a.assignedRequired}</TableCell>
                            <TableCell className={getPercentColor(a.assignmentPercent)}>
                                {a.assignmentPercent}%
                            </TableCell>
                            <TableCell className={getPercentColor(a.completionPercent)}>
                                {a.completionPercent}%
                            </TableCell>
                            <TableCell>{a.revenue}</TableCell>
                            <TableCell>{a.lostRevenue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
