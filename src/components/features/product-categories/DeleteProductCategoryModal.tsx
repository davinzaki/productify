import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDeleteProductCategory } from "@/api/product-categories/delete-product-category-api"
import type { DialogProps } from "@radix-ui/react-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface Props extends DialogProps {
    productCategoryId: number | null
}
const DeleteProductCategoryModal = ({ productCategoryId, onOpenChange, ...props }: Props) => {
    const queryClient = useQueryClient()
    const { mutate: deleteProductCategory, isPending } = useDeleteProductCategory({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-categories'] })
            toast('Data deleted succesfully!')
            onOpenChange?.(false)
        },
        onError: () => {
            toast('Data failed to delete!')
        },
    })

    const handleDelete = () => {
        if (!productCategoryId) return;

        deleteProductCategory({ id: productCategoryId })
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
                    <Button className="cursor-pointer" type="submit" disabled={isPending} onClick={handleDelete}>Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteProductCategoryModal