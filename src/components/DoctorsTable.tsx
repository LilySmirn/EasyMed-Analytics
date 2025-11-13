"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableRoot } from "@/components/Table";
import Link from "next/link";
import { getPercentColor } from "@/utils/getPercentColor";
import { SortableHeader } from "@/components/SortableHeader";
import { useSortableData } from "@/components/useSortableData";

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
    const { items, requestSort, sortConfig } = useSortableData<Doctor>(data);

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <SortableHeader
                                label="ФИО"
                                columnKey="fullName"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Приёмы"
                                columnKey="appointments"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Первичные"
                                columnKey="primary"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Обязательные (КР)"
                                columnKey="requiredKR"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="% отклонений"
                                columnKey="deviationPercent"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Всего услуг назначено"
                                columnKey="totalServices"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Ср. на 1 приём"
                                columnKey="avgServicesPerVisit"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="% и шт без назначений"
                                columnKey="noServices"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Средний чек"
                                columnKey="avgBill"
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell>
                                <Link href={{ pathname: "/appointments", query: { id: doc.id } }} className="text-blue-600 hover:underline">
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
