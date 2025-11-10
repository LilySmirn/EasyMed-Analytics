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

export interface Nosology {
    id: string;
    name: string; // название нозологии
    diagnosesCount: number; // количество диагнозов
    noServicesVisits: number; // приёмы без назначений
    requiredServices: number; // количество обязательных услуг
    appointmentRate: string; // процент назначения
    completionRate: string; // процент выполнения
    deviationRate: string; // процент отклонений
    revenue: string; // выручка
    lostRevenue: string; // потерянная выручка
    avgAssignRate: string; // средняя назначаемость
}

interface NosologiesTableProps {
    data: Nosology[];
}

export function NosologiesTable({ data }: NosologiesTableProps) {
    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Нозология</TableHeaderCell>
                        <TableHeaderCell>Кол-во диагнозов</TableHeaderCell>
                        <TableHeaderCell>Приёмы без назначений</TableHeaderCell>
                        <TableHeaderCell>Кол-во обязат. услуг</TableHeaderCell>
                        <TableHeaderCell>% назначения</TableHeaderCell>
                        <TableHeaderCell>% выполнения</TableHeaderCell>
                        <TableHeaderCell>% отклонений</TableHeaderCell>
                        <TableHeaderCell>Выручка</TableHeaderCell>
                        <TableHeaderCell>Потерянная выручка</TableHeaderCell>
                        <TableHeaderCell>Ср. назначаемость</TableHeaderCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((nos) => (
                        <TableRow key={nos.id}>
                            <TableCell>
                                <Link
                                    href={{
                                        pathname: "/nosology-details",
                                        query: { id: nos.id },
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    {nos.name}
                                </Link>
                            </TableCell>
                            <TableCell>{nos.diagnosesCount}</TableCell>
                            <TableCell>{nos.noServicesVisits}</TableCell>
                            <TableCell>{nos.requiredServices}</TableCell>
                            <TableCell>{nos.appointmentRate}</TableCell>
                            <TableCell>{nos.completionRate}</TableCell>
                            <TableCell>{nos.deviationRate}</TableCell>
                            <TableCell>{nos.revenue}</TableCell>
                            <TableCell>{nos.lostRevenue}</TableCell>
                            <TableCell>{nos.avgAssignRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
