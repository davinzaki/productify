import { Button } from "@/components/ui/button"
import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"


import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CreateProductTypeValidator } from "@/validators/products/create-product-validator"
import { useGetListProductCategories } from "@/api/product-categories/get-list-product-categories-api"
import { useCreateProduct } from "@/api/products/create-product-api"
import { cn } from "@/lib/utils"
import { DialogClose } from "@radix-ui/react-dialog"

const CreateProductModal = () => {
    const queryClient = useQueryClient()
    const { data: productCategories } = useGetListProductCategories()
    const [open, setOpen] = useState(false);
    const { mutate, isPending } = useCreateProduct({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            form.reset();
            toast('Data saved succesfully!')
            setOpen(false)
        },
        onError: () => {
            form.reset();
            toast('Data failed to save!')
        },
    })

    const form = useForm({
        defaultValues: {
            name: '',
            price: 0,
            stock: 0,
            categoryId: 0
        },
        resolver: zodResolver(CreateProductTypeValidator)
    })

    const onSubmit = form.handleSubmit((data) => {
        console.log('data', data)
        mutate({ ...data })
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="cursor-pointer"> <Plus /> Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create product</DialogTitle>
                    <DialogDescription>
                        Add new product
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} onChange={event => field.onChange(+event.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="stock" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} onChange={event => field.onChange(+event.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Product Category</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? productCategories?.find(
                                                            (productCategory) => productCategory.id === field.value
                                                        )?.name
                                                        : "Select product category"}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search framework..."
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No framework found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {productCategories?.map((productCategory) => (
                                                            <CommandItem
                                                                value={productCategory.name}
                                                                key={productCategory.id}
                                                                onSelect={() => {
                                                                    form.setValue("categoryId", productCategory.id)
                                                                }}
                                                            >
                                                                {productCategory.name}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        productCategory.id === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="cursor-pointer" type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className="cursor-pointer" type="submit" disabled={isPending}>Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateProductModal