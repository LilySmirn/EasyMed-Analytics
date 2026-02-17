// Tremor Table [v1.0.0]

import React from "react"
import { cx } from "@/lib/utils"

export const TableRoot = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, forwardedRef) => (
    <div ref={forwardedRef}>
        <div
        className={cx(
            "w-full overflow-x-hidden",
            className
            )}
        {...props}
        >
        {children}
    </div>
</div>
))

TableRoot.displayName = "TableRoot"

export const Table = React.forwardRef<
    HTMLTableElement,
    React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, forwardedRef) => (
    <table
        ref={forwardedRef}
        tremor-id="tremor-raw"
        className={cx(
            "w-full table-fixed caption-bottom border-b border-gray-200 dark:border-gray-800",
                className,
)}
        {...props}
    />
))

Table.displayName = "Table"

export const TableHead = React.forwardRef<
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
            "border-b px-1 py-2 text-left text-[clamp(0.67rem,0.58rem+0.25vw,0.875rem)] font-semibold leading-tight", // сохраняем верх/низ, уменьшаем слева/справа
            "text-gray-900 dark:text-gray-50",
            "border-gray-200 dark:border-gray-800",

            // responsive behavior␊
            "whitespace-normal break-words align-top min-w-0",

            className,
            )}
        {...props}
    />
))

TableHeaderCell.displayName = "TableHeaderCell"

export const TableBody = React.forwardRef<
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

export const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, forwardedRef) => (
    <tr
        ref={forwardedRef}
        className={cx(
            "[&_td:last-child]:pr-2 [&_th:last-child]:pr-2",
            "[&_td:first-child]:pl-2 [&_th:first-child]:pl-2",
            "[&_th]:align-top [&_th]:min-w-0 [&_td]:min-w-0",
            className,
        )}
        {...props}
    />
))

TableRow.displayName = "TableRow"

export const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, forwardedRef) => (
    <td
        ref={forwardedRef}
        className={cx(
            "px-1 py-2 text-[clamp(0.67rem,0.58rem+0.2vw,0.875rem)] leading-tight", // сохраняем верх/низ (py-4), уменьшаем слева/справа
            "text-gray-600 dark:text-gray-400",

            // перенос слов, не ломая слова␊
            "whitespace-normal break-words align-top min-w-0",

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
