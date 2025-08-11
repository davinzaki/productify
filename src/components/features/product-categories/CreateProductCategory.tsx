import { Button } from "@/components/ui/button"
import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { useCreateProductCategory } from "@/api/product-categories/create-product-category-api"
import { useQueryClient } from "@tanstack/react-query"
import { CreateProductCategoryValidator, type CreateProductCategoryValidatorType } from "@/validators/product-categories/create-product-category-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

const CreateProduct = () => {
    const queryClient = useQueryClient()

    const { register, handleSubmit, reset } = useForm<CreateProductCategoryValidatorType>({
        defaultValues: {
            name: ''
        },
        mode: "onChange",
        resolver: zodResolver(CreateProductCategoryValidator)
    })

    const { mutate, isPending } = useCreateProductCategory({

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product-categories'] })
            reset();
            toast('Data saved succesfully!')
        },
        onError: () => {
            reset();
            toast('Data failed to save!')
        },
    })

    const onSubmit = handleSubmit((data) => {
        console.log('clicked')
        console.log(data)
        mutate({ ...data })
    })

    const handleClick = () => {
        console.log('clicked')
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="cursor-pointer"> <Plus /> Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create product category</DialogTitle>
                    <DialogDescription>
                        Add new product category
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
                        <Button className="cursor-pointer" type="submit" disabled={isPending} onClick={handleClick}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateProduct