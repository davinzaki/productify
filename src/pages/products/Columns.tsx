import type { ColumnDef } from "@tanstack/react-table"


export type Product = {
    id: number
    name: string
    price: number
    stock: number
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
]