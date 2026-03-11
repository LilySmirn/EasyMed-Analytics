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
import { useMode } from "@/context/ModeContext";

export interface Doctor {
    id: string;
    fullName: string;
    profession: string;
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
    repeatAppointments: number;
    assignedOUKRAvg: number;
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
    const { mode } = useMode();

    const columns: ColumnConfig[] =
        (mode === "finance" ? financeColumns : qualityColumns).filter((col) => !col.hidden);

    const { items, requestSort, sortConfig } =
        useSortableData<Doctor>(data, "doctorsSorting");

    const getCellPercentValue = (col: ColumnConfig, row: Doctor): number => {
        return row[col.key] as number;
    };

    const formatCellValue = (col: ColumnConfig, row: Doctor) => {
        const value = row[col.key];
        if (
            (col.key === "servicesCompletedPercent" ||
                col.key === "assignedOUKRAvg" ||
                col.key === "lostOUKRPercent") &&
            typeof value === "number"
        ) {
            return `${getCellPercentValue(col, row)} %`;
        }
        return value;
    };

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell
                                key={String(col.key)}
                                className={`${col.minWidth ?? ""} ${col.maxWidth ?? ""} whitespace-normal break-words ${col.key === "fullName" ? "whitespace-nowrap break-normal" : ""}`}
                            >
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
                    {items.map((doc, index) => (
                        <TableRow key={doc.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {columns.map((col) => (
                                <TableCell
                                    key={String(col.key)}
                                    className={`
                                        ${col.minWidth ?? ""} ${col.maxWidth ?? ""} 
                                        whitespace-normal break-words
                                         ${col.key === "fullName" ? "whitespace-nowrap break-normal" : ""}
                                        ${col.color
                                        ? getPercentColor(
                                            getCellPercentValue(col, doc),
                                            col.color === "reverse"
                                                ? "reverse"
                                                : undefined
                                        )
                                        : ""}
                                    `}
                                >
                                    {col.link ? (
                                        <Link
                                            href={{
                                                pathname: "/appointments",
                                                query: { id: doc.id },
                                            }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {formatCellValue(col, doc)}
                                        </Link>
                                    ) : (
                                        formatCellValue(col, doc)
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
