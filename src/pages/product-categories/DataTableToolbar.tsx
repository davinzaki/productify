import { Button } from '@/components/ui/button'
import type { Table } from '@tanstack/react-table'
import { Plus } from 'lucide-react'

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    console.log('table', table)
    return (
        <div className="flex items-center justify-end">
            <div className="flex items-end gap-2">
                <Button size="sm"> <Plus /> Add</Button>
            </div>
        </div>
    )
}

export default DataTableToolbar