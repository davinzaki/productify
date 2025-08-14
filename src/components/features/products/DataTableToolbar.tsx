import type { Table } from '@tanstack/react-table'
import CreateProductModal from './CreateProductModal'

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
                <CreateProductModal />
            </div>
        </div>
    )
}

export default DataTableToolbar