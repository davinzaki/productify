import { DialogDescription, type DialogProps } from '@radix-ui/react-dialog'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
interface Props extends DialogProps {
    productId: number | null
}

const DeleteProductModal = ({ productId, onOpenChange, ...props }: Props) => {
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
                    <Button className="cursor-pointer" type="submit">Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteProductModal