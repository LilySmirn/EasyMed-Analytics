"use client";

import React from "react";
import Link from "next/link";
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

export interface Nosology {
    id: string;
    name: string;
    diagnosesCount: number;
    noServices: number;
    requiredServices: number;
    assignPercent: number;
    completionPercent: number;
    deviationPercent: number;
    revenue: string;
    lostRevenue: string;
    avgAssign: number;
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
                    {data.map((nosology) => (
                        <TableRow key={nosology.id}>
                            <TableCell>
                                <Link
                                    href={{
                                        pathname: `/nosologies/${nosology.id}`,
                                        query: { name: nosology.name },
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    {nosology.name}
                                </Link>
                            </TableCell>
                            <TableCell>{nosology.diagnosesCount}</TableCell>
                            <TableCell>{nosology.noServices}</TableCell>
                            <TableCell>{nosology.requiredServices}</TableCell>
                            <TableCell className={getPercentColor(nosology.assignPercent)}>
                                {nosology.assignPercent}%
                            </TableCell>
                            <TableCell className={getPercentColor(nosology.completionPercent)}>
                                {nosology.completionPercent}%
                            </TableCell>
                            <TableCell className={getPercentColor(nosology.deviationPercent, "reverse")}>
                                {nosology.deviationPercent}%
                            </TableCell>
                            <TableCell>{nosology.revenue}</TableCell>
                            <TableCell>{nosology.lostRevenue}</TableCell>
                            <TableCell>{nosology.avgAssign}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
