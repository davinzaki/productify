import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import DataTableRowActions from "./DataTableRowActions"
import type { ProductEntity } from "@/types/entities/product.entity"


export const columns: ColumnDef<ProductEntity>[] = [
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
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    }
]