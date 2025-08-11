import { Button } from "@/components/ui/button"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import DataTableRowActions from "./DataTableRowActions"
import type { ProductCategoryEntity } from "@/types/entities/product-category.entity"

export const columns: ColumnDef<ProductCategoryEntity>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) =>
            <div className="text-start">{row.getValue('name')}</div>

    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <DataTableRowActions row={row} />
    }
]