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
import { useMode } from "@/context/ModeContext"; // <-- подключаем глобальный контекст

export interface Nosology {
    id: string;
    name: string;

    appointments: number;
    primaryAppointments: number;
    repeatAppointments: number;
    appointmentsWithoutServices: number;

    oukr: number;
    assignedOUKRAvg: number;
    servicesCompletedPercent: number;
    overKR: number;
    totalServicesAssigned: number;
    avgServicesPerVisit: number;

    revenue: string;
    avgCheck: string;
    potentialRevenue: string;
    lostOUKRRevenue: string;
    lostOUKRPercent: number;
    patientRevenueLoss: string;
}

interface NosologiesTableProps {
    data: Nosology[];
}

export function NosologiesTable({ data }: NosologiesTableProps) {
    const { mode } = useMode(); // <-- берём глобальный режим
    const useFinance = mode === "finance";

    const columns: ColumnConfig[] = useFinance ? financeColumns : qualityColumns;

    const { items, requestSort, sortConfig } = useSortableData<Nosology>(
        data,
        "nosologiesSorting"
    );

    const getCellPercentValue = (col: ColumnConfig, item: Nosology): number => {
        return item[col.key] as number;
    };

    const formatCellValue = (col: ColumnConfig, item: Nosology) => {
        const value = item[col.key];
        if (
            (col.key === "servicesCompletedPercent" ||
                col.key === "assignedOUKRAvg" ||
                col.key === "lostOUKRPercent") &&
            typeof value === "number"
        ) {
            return `${getCellPercentValue(col, item)} %`;
        }
        return value;
    };

    const formatThousands = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

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
                    {items.map((item, index) => (
                        <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key as string}
                                    className={
                                        col.color
                                            ? getPercentColor(
                                                getCellPercentValue(col, item),
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
                                            {formatCellValue(col, item)}
                                        </Link>
                                    ) : col.key === "totalServicesAssigned" ? (
                                        formatThousands(item.totalServicesAssigned)
                                    ) : (
                                        formatCellValue(col, item)
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
