'use client';

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableRoot } from "@/components/Table";
import { getPercentColor } from "@/utils/getPercentColor";

export interface Specialty {
    id: string;
    name: string;
    revenue: number;
    lostRevenue: number;
    percentAssigned: number;
    percentCompleted: number;
    percentDeviation: number;
    avgBill: number;
}

interface SpecialtiesTableProps {
    data: Specialty[];
}

type SortConfig = { key: keyof Specialty; direction: "asc" | "desc" } | null;

export function SpecialtiesTable({ data }: SpecialtiesTableProps) {
    const [sortConfig, setSortConfig] = useState<SortConfig>(null);

    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (typeof aVal === "number" && typeof bVal === "number") {
                return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
            }

            return sortConfig.direction === "asc"
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
        });
    }, [data, sortConfig]);

    const requestSort = (key: keyof Specialty) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };

    const getSortArrow = (key: keyof Specialty) => {
        if (sortConfig?.key !== key) return null;
        return sortConfig.direction === "asc" ? " ↑" : " ↓";
    };

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => requestSort("name")}>Специальность{getSortArrow("name")}</TableCell>
                        <TableCell className="text-center" onClick={() => requestSort("revenue")}>Выручка{getSortArrow("revenue")}</TableCell>
                        <TableCell className="text-center" onClick={() => requestSort("lostRevenue")}>Потерянная выручка{getSortArrow("lostRevenue")}</TableCell>
                        <TableCell className="text-center" onClick={() => requestSort("percentAssigned")}>% назначения{getSortArrow("percentAssigned")}</TableCell>
                        <TableCell className="text-center" onClick={() => requestSort("percentCompleted")}>% выполнения{getSortArrow("percentCompleted")}</TableCell>
                        <TableCell className="text-center" onClick={() => requestSort("percentDeviation")}>% отклонений{getSortArrow("percentDeviation")}</TableCell>
                        <TableCell className="text-center" onClick={() => requestSort("avgBill")}>Средний чек{getSortArrow("avgBill")}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedData.map((spec) => (
                        <TableRow key={spec.id}>
                            <TableCell>{spec.name}</TableCell>
                            <TableCell className="text-center">{spec.revenue.toLocaleString("ru-RU")} ₽</TableCell>
                            <TableCell className="text-center">{spec.lostRevenue.toLocaleString("ru-RU")} ₽</TableCell>
                            <TableCell className={`text-center ${getPercentColor(spec.percentAssigned)}`}>{spec.percentAssigned}%</TableCell>
                            <TableCell className={`text-center ${getPercentColor(spec.percentCompleted)}`}>{spec.percentCompleted}%</TableCell>
                            <TableCell className={`text-center ${getPercentColor(spec.percentDeviation, "reverse")}`}>{spec.percentDeviation}%</TableCell>
                            <TableCell className="text-center">{spec.avgBill.toLocaleString("ru-RU")} ₽</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
