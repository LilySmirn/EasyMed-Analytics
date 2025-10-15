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
import Link from "next/link";

interface Doctor {
    id: string;
    fullName: string;
    appointments: number;
    primary: number;
    requiredKR: number;
    deviations: number;
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
                <TableCaption>Список докторов</TableCaption>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>ФИО</TableHeaderCell>
                        <TableHeaderCell>Приёмы</TableHeaderCell>
                        <TableHeaderCell>Первичные</TableHeaderCell>
                        <TableHeaderCell>Обязательные (КР)</TableHeaderCell>
                        <TableHeaderCell>Отклонения от КР</TableHeaderCell>
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
                            <TableCell>{doc.id}</TableCell>
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
                            <TableCell>{doc.deviations}</TableCell>
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
