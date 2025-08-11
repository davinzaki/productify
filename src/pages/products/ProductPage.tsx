import { columns } from "./Columns"
import SkeletonTableBasic from "@/components/shared/SkeletonTableBasic";
import { useGetListProducts } from "@/api/products/get-list-products-api";
import { useCreateProduct } from "@/api/products/create-product-api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductTypeValidator } from "@/validators/products/create-product-validator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetListProductCategories } from "@/api/product-categories/get-list-product-categories-api";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

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
import DataTable from "./DataTable";

export const ProductPage = () => {
    const queryClient = useQueryClient()
    const { data: products, isLoading, error } = useGetListProducts();
    const { data: productCategories } = useGetListProductCategories()
    const { mutate, isPending } = useCreateProduct({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            form.reset();
            toast('Data saved succesfully!')
        }
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

    if (error) return <div>Error: {error.message}</div>;


    return (

        <>
            <div className="w-full h-full flex-1 flex-col gap-8 p-8 md:flex">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Products
                        </h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of products.
                        </p>
                    </div>
                </div>
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
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? productCategories?.find(
                                                            (productCategory) => productCategory.id === field.value
                                                        )?.name
                                                        : "Select productCategory"}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
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
                        <Button type="submit" disabled={isPending} >Save</Button>
                    </form>
                </Form>
                {isLoading ? <SkeletonTableBasic /> : <DataTable columns={columns} data={products ?? []} />}
            </div>
        </>
    )
}

export default ProductPage
