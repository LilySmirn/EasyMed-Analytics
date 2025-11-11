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

export interface NosologyDoctor {
    id: number;
    name: string;
    diagnosesCount: number;
    requiredServices: number;
    assignPercent: number;
    completionPercent: number;
    deviationPercent: number;
    revenue: string;
    lostRevenue: string;
    avgAssign: number;
}

interface NosologyDoctorsTableProps {
    data: NosologyDoctor[];
}

export function NosologyDoctorsTable({ data }: NosologyDoctorsTableProps) {
    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ФИО врача</TableHeaderCell>
                        <TableHeaderCell>Кол-во диагнозов</TableHeaderCell>
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
                    {data.map((doctor) => (
                        <TableRow key={doctor.id}>
                            <TableCell>{doctor.name}</TableCell>
                            <TableCell>{doctor.diagnosesCount}</TableCell>
                            <TableCell>{doctor.requiredServices}</TableCell>
                            <TableCell>{doctor.assignPercent}%</TableCell>
                            <TableCell>{doctor.completionPercent}%</TableCell>
                            <TableCell>{doctor.deviationPercent}%</TableCell>
                            <TableCell>{doctor.revenue}</TableCell>
                            <TableCell>{doctor.lostRevenue}</TableCell>
                            <TableCell>{doctor.avgAssign}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
