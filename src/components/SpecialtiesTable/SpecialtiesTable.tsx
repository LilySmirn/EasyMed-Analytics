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

export interface Specialty {
    id: string;
    name: string;

    appointments: number;
    noServices: number;

    requiredKR: number;
    assignedOUKRPercent: number;
    servicesCompletedPercent: number;
    deviationOUKRPercent: number;

    avgOUKRAssign: number;
    avgNosologyAssign: number;

    totalServices: number;
    overKR: number;

    revenue: string;
    avgBill: string;
    potentialRevenue: string;
    lostOUKRRevenue: string;
    lostOUKRPercent: number;
}

interface Props {
    data: Specialty[];
    useFinance?: boolean;
}

export function SpecialtiesTable({ data, useFinance = false }: Props) {
    const columns: ColumnConfig[] = useFinance ? financeColumns : qualityColumns;
    const { items, requestSort, sortConfig } =
        useSortableData<Specialty>(data, "specialtiesSorting");

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col.key}>
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
                    {items.map((spec) => (
                        <TableRow key={spec.id}>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    className={
                                        col.color
                                            ? getPercentColor(
                                                spec[col.key] as number,
                                                col.color === "reverse"
                                                    ? "reverse"
                                                    : undefined
                                            )
                                            : undefined
                                    }
                                >
                                    {col.link ? (
                                        <Link
                                            href={{
                                                pathname: "/appointments",
                                                query: { specialty: spec.name },
                                            }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {spec[col.key]}
                                        </Link>
                                    ) : (
                                        spec[col.key]
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
