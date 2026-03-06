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
import { useMode } from "@/context/ModeContext"; // ✅ добавляем контекст

export interface Specialty {
    id: string;
    name: string;

    appointments: number;
    noServices: number;

    requiredKR: number;
    assignedOUKRAvg: number;
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
    useFinance?: boolean; // можно оставить, если нужен override
}

export function SpecialtiesTable({ data, useFinance }: Props) {
    const { mode } = useMode(); // получаем глобальный режим
    const isFinance = useFinance ?? (mode === "finance"); // если пропс не передан, берем из контекста

    const columns: ColumnConfig[] = isFinance ? financeColumns : qualityColumns;
    const { items, requestSort, sortConfig } =
        useSortableData<Specialty>(data, "specialtiesSorting");

    const formatCellValue = (col: ColumnConfig, spec: Specialty) => {
        const value = spec[col.key];
        if (col.key === "servicesCompletedPercent" && typeof value === "number") {
            return `${value}%`;
        }
        return value;
    };

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
                    {items.map((spec, index) => (
                        <TableRow key={spec.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    className={
                                        col.color
                                            ? getPercentColor(
                                                spec[col.key] as number,
                                                col.color === "reverse" ? "reverse" : undefined
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
                                            {formatCellValue(col, spec)}
                                        </Link>
                                    ) : (
                                        formatCellValue(col, spec)
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
