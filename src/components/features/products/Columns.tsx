import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import DataTableRowActions from "./DataTableRowActions"


export type Product = {
    id: number
    name: string
    price: number
    stock: number
}

export const columns: ColumnDef<Product>[] = [
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