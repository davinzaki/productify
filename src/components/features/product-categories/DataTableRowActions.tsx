import type { Row } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import type { ProductCategoryEntity } from "@/types/entities/product-category.entity"
import { useState } from "react"
import EditProductCategoryModal from "./EditProductCategoryModal"
import DeleteProductCategoryModal from "./DeleteProductCategoryModal"

interface DataTableRowActionsProps {
    row: Row<ProductCategoryEntity>
}

const DataTableRowActions = ({ row }: DataTableRowActionsProps) => {
    const [productCategory, setProductCategory] = useState<ProductCategoryEntity | null>(null)
    const [productCategoryEdit, setProductCategoryEdit] = useState(false)
    const [productCategoryDelete, setProductCategoryDelete] = useState(false)

    return (
        <>
            <EditProductCategoryModal open={productCategoryEdit} onOpenChange={setProductCategoryEdit} productCategory={productCategory || null} />
            <DeleteProductCategoryModal open={productCategoryDelete} onOpenChange={setProductCategoryDelete} productCategoryId={productCategory?.id || null} />

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
                    <DropdownMenuItem onClick={() => {
                        setProductCategory(row.original)
                        setProductCategoryDelete(true)
                    }}>
                        <Trash />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        setProductCategory(row.original)
                        setProductCategoryEdit(true)
                    }}>
                        < Edit /> Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default DataTableRowActions