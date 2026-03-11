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
    assignedTotal: number;
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
                        <TableHeaderCell className="text-center">МКБ</TableHeaderCell>
                        <TableHeaderCell className="text-center">Кол-во обяз. услуг</TableHeaderCell>
                        <TableHeaderCell className="text-center">Назначено обяз.</TableHeaderCell>
                        <TableHeaderCell className="text-center">Назначено всего</TableHeaderCell>
                        <TableHeaderCell className="text-center">% назначений ОУКР</TableHeaderCell>
                        <TableHeaderCell className="text-center">Выполнено пациентами</TableHeaderCell>
                        <TableHeaderCell className="text-center">Выручка</TableHeaderCell>
                        <TableHeaderCell className="text-center">Потерянная выручка</TableHeaderCell>
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
                            <TableCell className="text-center">{a.mkb}</TableCell>
                            <TableCell className="text-center">{a.requiredServices}</TableCell>
                            <TableCell className="text-center">{a.assignedRequired}</TableCell>
                            <TableCell className="text-center">{a.assignedTotal}</TableCell>
                            <TableCell className={`text-center ${getPercentColor(a.assignmentPercent)}`}>
                                {a.assignmentPercent}%
                            </TableCell>
                            <TableCell className={`text-center ${getPercentColor(a.completionPercent)}`}>
                                {a.completionPercent}%
                            </TableCell>
                            <TableCell className="text-center">{a.revenue}</TableCell>
                            <TableCell className="text-center">{a.lostRevenue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
