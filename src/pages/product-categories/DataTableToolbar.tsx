import type { Table } from '@tanstack/react-table'
import CreateProduct from './CreateProduct'

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
                <CreateProduct />
                {/* <Button size="sm"> <Plus /> Add</Button> */}
            </div>
        </div>
    )
}

export default DataTableToolbar