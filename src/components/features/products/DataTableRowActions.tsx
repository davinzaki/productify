
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type Row } from "@tanstack/react-table"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import EditProductModal from "./EditProductModal"
import DeleteProductModal from "./DeleteProductModal"
import { useState } from "react"
import type { ProductEntity } from "@/types/entities/product.entity"

interface DataTableRowActionsProps {
  row: Row<ProductEntity>
}

const DataTableRowActions = ({ row }: DataTableRowActionsProps) => {
  const [product, setProduct] = useState<ProductEntity | null>(null);
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);

  return (
    <>
      <EditProductModal open={editProduct} onOpenChange={setEditProduct} product={product || null} />
      <DeleteProductModal open={deleteProduct} onOpenChange={setDeleteProduct} productId={product?.id || null} />

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
            setProduct(row.original)
            setDeleteProduct(true)
          }}>
            <Trash />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            setProduct(row.original)
            setEditProduct(true)
          }}>
            <Edit />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default DataTableRowActions