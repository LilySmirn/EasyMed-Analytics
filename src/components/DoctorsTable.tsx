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
import Link from "next/link";
import { getPercentColor } from "@/utils/getPercentColor";

export interface Doctor {
    id: string;
    fullName: string;
    appointments: number;
    primary: number;
    requiredKR: number;
    deviationPercent: number;
    totalServices: number;
    avgServicesPerVisit: number;
    noServices: string;
    avgBill: string;
    revenue: string;
    servicesPerVisit: number;
}

interface DoctorsTableProps {
    data: Doctor[];
}

export function DoctorsTable({ data }: DoctorsTableProps) {
    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ФИО</TableHeaderCell>
                        <TableHeaderCell>Приёмы</TableHeaderCell>
                        <TableHeaderCell>Первичные</TableHeaderCell>
                        <TableHeaderCell>Обязательные (КР)</TableHeaderCell>
                        <TableHeaderCell>% отклонений</TableHeaderCell>
                        <TableHeaderCell>Всего услуг назначено</TableHeaderCell>
                        <TableHeaderCell>Ср. на 1 приём</TableHeaderCell>
                        <TableHeaderCell>% и шт без назначений</TableHeaderCell>
                        <TableHeaderCell>Средний чек</TableHeaderCell>
                        <TableHeaderCell>Выручка</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell>
                                <Link
                                    href={{
                                        pathname: "/appointments",
                                        query: { id: doc.id },
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    {doc.fullName}
                                </Link>
                            </TableCell>
                            <TableCell>{doc.appointments}</TableCell>
                            <TableCell>{doc.primary}</TableCell>
                            <TableCell>{doc.requiredKR}</TableCell>
                            <TableCell className={getPercentColor(doc.deviationPercent, "reverse")}>
                                {doc.deviationPercent}%
                            </TableCell>
                            <TableCell>{doc.totalServices}</TableCell>
                            <TableCell>{doc.avgServicesPerVisit}</TableCell>
                            <TableCell>{doc.noServices}</TableCell>
                            <TableCell>{doc.avgBill}</TableCell>
                            <TableCell>{doc.revenue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
