"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableRoot,
} from "@/components/Table";
import Link from "next/link";
import { getPercentColor } from "@/utils/getPercentColor";
import { SortableHeader } from "@/components/SortableHeader";
import { useSortableData } from "@/components/useSortableData";
import { columns, ColumnConfig } from "./columns";

export interface Doctor {
    id: string;
    fullName: string;
    profession: string;

    // Старые поля
    appointments: number;
    primary: number;
    requiredKR: number;
    krServicesDone: number;
    deviationPercent: number;
    totalServices: number;
    avgServicesPerVisit: number;
    servicesPerVisit: number;
    noServices: string;
    avgBill: string;
    revenue: string;

    // Новые поля
    repeatAppointments: number;
    assignedOUKRPercent: number;
    servicesCompletedPercent: number;
    overKR: number;

    potentialRevenue: string;
    lostOUKRRevenue: string;
    lostOUKRPercent: number;
}

interface DoctorsTableProps {
    data: Doctor[];
}

export function DoctorsTable({ data }: DoctorsTableProps) {
    const { items, requestSort, sortConfig } = useSortableData<Doctor>(data, "doctorsSorting");

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col: ColumnConfig) => (
                            <TableCell key={col.key as string}>
                                <SortableHeader
                                    label={col.label}
                                    columnKey={col.key}
                                    sortConfig={sortConfig}
                                    onSort={requestSort}
                                />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {items.map((doc) => (
                        <TableRow key={doc.id}>
                            {columns.map((col: ColumnConfig) => (
                                <TableCell
                                    key={col.key as string}
                                    className={col.color ? getPercentColor(doc[col.key] as number, col.color === "reverse" ? "reverse" : undefined) : undefined}
                                >
                                    {col.link ? (
                                        <Link
                                            href={{ pathname: "/appointments", query: { id: doc.id } }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {doc[col.key]}
                                        </Link>
                                    ) : (
                                        doc[col.key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
