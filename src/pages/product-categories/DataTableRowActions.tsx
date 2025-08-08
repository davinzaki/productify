import type { Row } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}
const DataTableRowActions = <TData,>({ row }: DataTableRowActionsProps<TData>) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="data-[state=open]:bg-muted size-8"
                >
                    <MoreHorizontal />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>
                    <Trash />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Edit />
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DataTableRowActions