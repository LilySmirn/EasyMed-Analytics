'use client';

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TableRoot } from "@/components/Table";
import { SortableHeader } from "@/components/SortableHeader";
import { useSortableData } from "@/components/useSortableData";

export interface Statistic {
    id: string;
    name: string; // Название нозологии
    requests: number; // Запрос
    percentOfAppointments: number; // % от общего количества приемов
}

interface StatisticsTableProps {
    data: Statistic[];
}

export function StatisticsTable({ data }: StatisticsTableProps) {
    const { items, requestSort, sortConfig } = useSortableData<Statistic>(data);

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <SortableHeader
                                label="Название нозологии"
                                columnKey="name"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="Запрос"
                                columnKey="requests"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                        <TableCell>
                            <SortableHeader
                                label="% от общего количества приемов"
                                columnKey="percentOfAppointments"
                                sortConfig={sortConfig}
                                onSort={requestSort}
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((stat) => (
                        <TableRow key={stat.id}>
                            <TableCell>{stat.name}</TableCell>
                            <TableCell>{stat.requests}</TableCell>
                            <TableCell>{stat.percentOfAppointments}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableRoot>
    );
}
