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
import { qualityColumns, financeColumns, ColumnConfig } from "./columns";

export interface Nosology {
    id: string;
    name: string;

    appointments: number;
    primaryAppointments: number;
    repeatAppointments: number;
    appointmentsWithoutServices: number;

    oukr: number;
    assignedOUKRPercent: number;
    servicesCompletedPercent: number;
    overKR: number;
    totalServicesAssigned: number;
    avgServicesPerVisit: number;

    revenue: string;
    avgCheck: string;
    potentialRevenue: string;
    lostOUKRRevenue: string;
    lostOUKRPercent: number;
}

interface NosologiesTableProps {
    data: Nosology[];
    useFinance?: boolean;
}

export function NosologiesTable({ data, useFinance = false }: NosologiesTableProps) {
    const columns: ColumnConfig[] = useFinance ? financeColumns : qualityColumns;
    const { items, requestSort, sortConfig } = useSortableData<Nosology>(data, "nosologiesSorting");

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
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
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key as string}
                                    className={
                                        col.color
                                            ? getPercentColor(
                                                item[col.key] as number,
                                                col.color === "reverse" ? "reverse" : undefined
                                            )
                                            : undefined
                                    }
                                >
                                    {col.link ? (
                                        <Link
                                            href={{
                                                pathname: `/nosologies/${item.id}`,
                                                query: { name: item.name },
                                            }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {item[col.key]}
                                        </Link>
                                    ) : (
                                        item[col.key]
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
