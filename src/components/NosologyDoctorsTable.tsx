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

export interface NosologyDoctor {
    id: string;
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
    nosologyId: string;
}

export function NosologyDoctorsTable({ data, nosologyId }: NosologyDoctorsTableProps) {
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
                            <TableCell>
                                <Link
                                    href={{
                                        pathname: "/appointments",
                                        query: {
                                            id: doctor.id,
                                            nosology: nosologyId,
                                        },
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    {doctor.name}
                                </Link>
                            </TableCell>
                            <TableCell>{doctor.diagnosesCount}</TableCell>
                            <TableCell>{doctor.requiredServices}</TableCell>
                            <TableCell
                                className={getPercentColor(doctor.assignPercent)}
                            >
                                {doctor.assignPercent}%
                            </TableCell>
                            <TableCell
                                className={getPercentColor(doctor.completionPercent)}
                            >
                                {doctor.completionPercent}%
                            </TableCell>
                            <TableCell
                                className={getPercentColor(doctor.deviationPercent, "reverse")}
                            >
                                {doctor.deviationPercent}%
                            </TableCell>
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
