// Tremor Table [v1.0.0]

import React from "react"
import { cx } from "@/lib/utils"

const TableRoot = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, forwardedRef) => (
    <div ref={forwardedRef}>
        <div
            className={cx(
                "w-full overflow-auto",
                className
            )}
            {...props}
        >
            {children}
        </div>
    </div>
))

TableRoot.displayName = "TableRoot"

const Table = React.forwardRef<
    HTMLTableElement,
    React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, forwardedRef) => (
    <table
        ref={forwardedRef}
        tremor-id="tremor-raw"
        className={cx(
            "w-full caption-bottom border-b border-gray-200 dark:border-gray-800",
            className,
        )}
        {...props}
    />
))

Table.displayName = "Table"

const TableHead = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, forwardedRef) => (
    <thead ref={forwardedRef} className={cx(className)} {...props} />
))

TableHead.displayName = "TableHead"

const TableHeaderCell = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, forwardedRef) => (
    <th
        ref={forwardedRef}
        className={cx(
            "border-b px-2 py-3.5 text-left text-sm font-semibold", // сохраняем верх/низ, уменьшаем слева/справа
            "text-gray-900 dark:text-gray-50",
            "border-gray-200 dark:border-gray-800",

            // responsive behavior
            "whitespace-normal break-words max-w-[150px] align-top",

            className,
        )}
        {...props}
    />
))

TableHeaderCell.displayName = "TableHeaderCell"

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, forwardedRef) => (
    <tbody
        ref={forwardedRef}
        className={cx(
            "divide-y divide-gray-200 dark:divide-gray-800",
            className,
        )}
        {...props}
    />
))

TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, forwardedRef) => (
    <tr
        ref={forwardedRef}
        className={cx(
            "[&_td:last-child]:pr-2 [&_th:last-child]:pr-2",
            "[&_td:first-child]:pl-2 [&_th:first-child]:pl-2",
            className,
        )}
        {...props}
    />
))

TableRow.displayName = "TableRow"

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, forwardedRef) => (
    <td
        ref={forwardedRef}
        className={cx(
            "px-1 py-4 text-sm", // сохраняем верх/низ (py-4), уменьшаем слева/справа
            "text-gray-600 dark:text-gray-400",

            // перенос слов, не ломая слова
            "whitespace-normal break-words align-top",

            className,
        )}
        {...props}
    />
))

TableCell.displayName = "TableCell"

const TableFoot = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, forwardedRef) => (
    <tfoot
        ref={forwardedRef}
        className={cx(
            "border-t border-gray-200 dark:border-gray-800 text-left font-medium",
            "text-gray-900 dark:text-gray-50",
            className,
        )}
        {...props}
    />
))

TableFoot.displayName = "TableFoot"

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, forwardedRef) => (
    <caption
        ref={forwardedRef}
        className={cx(
            "mt-3 px-3 text-center text-sm text-gray-500 dark:text-gray-500",
            className,
        )}
        {...props}
    />
))

TableCaption.displayName = "TableCaption"

export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFoot,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
}
