import { DialogDescription, type DialogProps } from '@radix-ui/react-dialog'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useDeleteProduct } from '@/api/products/delete-product-api'
import { ProductCategoryColumn } from '.'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
interface Props extends DialogProps {
    productId: number | null
}

const DeleteProductModal = ({ productId, onOpenChange, ...props }: Props) => {
    const queryClient = useQueryClient()
    const { mutate: deleteProduct } = useDeleteProduct({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast('Data deleted succesfully!')
            onOpenChange?.(false)
        },
        onError: () => {
            toast('Data failed to delete!')
        },
    })

    const handleDelete = () => {
        if (!ProductCategoryColumn) return;

        deleteProduct({ id: productId as number })
    }

    return (
        <Dialog onOpenChange={onOpenChange} {...props}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete product category</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this data?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="cursor-pointer" type="button" variant="outline">No</Button>
                    </DialogClose>
                    <Button className="cursor-pointer" type="submit" onClick={handleDelete}>Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteProductModal