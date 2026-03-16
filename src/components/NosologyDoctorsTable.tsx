"use client";

import React from "react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableRoot,
} from "@/components/Table";
import { getPercentColor } from "@/utils/getPercentColor";
import { SortableHeader } from "@/components/SortableHeader";
import { useSortableData } from "@/components/useSortableData";

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
    const { items, requestSort, sortConfig } = useSortableData<NosologyDoctor>(
        data,
        "nosologyDoctorsSorting"
    );

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <SortableHeader
                                label="ФИО врача"
                                columnKey="name"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Кол-во диагнозов"
                                columnKey="diagnosesCount"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Процент назначений ОУКР"
                                columnKey="assignPercent"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Выполнено пациентами"
                                columnKey="completionPercent"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Потерянная выручка"
                                columnKey="lostRevenue"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Выручка"
                                columnKey="revenue"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Ср. назначаемость"
                                columnKey="avgAssign"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((doctor) => (
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
