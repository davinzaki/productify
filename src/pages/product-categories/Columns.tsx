import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export type ProductCategory = {
    id: number
    name: string
}

export const columns: ColumnDef<ProductCategory>[] = [
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
        id: 'action'
    }
]