import type { Row } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import type { ProductCategoryEntity } from "@/types/entities/product-category.entity"
import EditProductCategoryModal from "./EditProductCategoryModal"
import { useState } from "react"

interface DataTableRowActionsProps {
    row: Row<ProductCategoryEntity>
}

const DataTableRowActions = ({ row }: DataTableRowActionsProps) => {
    const [productCategory, setProductCategory] = useState<ProductCategoryEntity | null>(null)
    const [productCategoryEdit, setProductCategoryEdit] = useState(false)

    const handleEdit = () => {
        setProductCategory(row.original)
        setProductCategoryEdit(true)
    }

    return (
        <>
            <EditProductCategoryModal open={productCategoryEdit} onOpenChange={setProductCategoryEdit} productCategory={productCategory || null} />
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
                    <DropdownMenuItem onClick={handleEdit}>
                        < Edit /> Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default DataTableRowActions