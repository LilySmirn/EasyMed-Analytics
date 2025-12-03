'use client';

import React from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableRow, TableRoot } from "@/components/Table";
import { getPercentColor } from "@/utils/getPercentColor";
import { SortableHeader } from "@/components/SortableHeader";
import { useSortableData } from "@/components/useSortableData";

export interface Specialty {
    id: string;
    name: string;
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

interface SpecialtiesTableProps {
    data: Specialty[];
}

export function SpecialtiesTable({ data }: SpecialtiesTableProps) {
    const { items, requestSort, sortConfig } = useSortableData<Specialty>(data);

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <SortableHeader
                                label="Специальность"
                                columnKey="name"
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
                    {items.map((spec) => (
                        <TableRow key={spec.id}>
                            <TableCell>
                                <Link
                                    href={{ pathname: "/appointments", query: { id: spec.id } }}
                                    className="text-blue-600 hover:underline"
                                >
                                    {spec.name}
                                </Link>
                            </TableCell>
                            <TableCell>{spec.appointments}</TableCell>
                            <TableCell>{spec.primary}</TableCell>
                            <TableCell>{spec.requiredKR}</TableCell>
                            <TableCell className={getPercentColor(spec.deviationPercent, "reverse")}>
                                {spec.deviationPercent}%
                            </TableCell>
                            <TableCell>{spec.totalServices}</TableCell>
                            <TableCell>{spec.avgServicesPerVisit}</TableCell>
                            <TableCell>{spec.noServices}</TableCell>
                            <TableCell>{spec.avgBill}</TableCell>
                            <TableCell>{spec.revenue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
