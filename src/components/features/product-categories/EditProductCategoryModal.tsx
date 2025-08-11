import { Button } from "@/components/ui/button"
import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { CreateProductCategoryValidator, type CreateProductCategoryValidatorType } from "@/validators/product-categories/create-product-category-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useEditProductCategory } from "@/api/product-categories/edit-product-category-api"
import type { DialogProps } from "@radix-ui/react-dialog"
import type { ProductCategoryEntity } from "@/types/entities/product-category.entity"
import { useEffect } from "react"

interface Props extends DialogProps {
    productCategory?: ProductCategoryEntity | null
}
const EditProductCategoryModal = ({ onOpenChange, productCategory, ...props }: Props) => {
    const queryClient = useQueryClient()

    const { register, handleSubmit, reset, setValue } = useForm<CreateProductCategoryValidatorType>({
        defaultValues: {
            name: productCategory?.name
        },
        mode: "onChange",
        resolver: zodResolver(CreateProductCategoryValidator)
    })

    const { mutate: editProductCategory, isPending } = useEditProductCategory({

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-categories'] })
            reset();
            toast('Data updated succesfully!')
            onOpenChange?.(false)
        },
        onError: () => {
            reset();
            toast('Data failed to update!')
        },
    })

    const onSubmit = handleSubmit((data) => {
        console.log('clicked')
        console.log(data)
        editProductCategory({ id: productCategory?.id as number, ...data })
    })

    useEffect(() => {
        setValue("name", productCategory?.name as string);
    }, [productCategory, setValue])

    return (
        <Dialog onOpenChange={onOpenChange} {...props}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit product category</DialogTitle>
                    <DialogDescription>
                        Make changes to your product category here.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 mb-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" placeholder="Name" {...register("name")} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="cursor-pointer" type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className="cursor-pointer" type="submit" disabled={isPending}>Edit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditProductCategoryModal