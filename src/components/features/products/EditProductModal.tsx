import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { ProductEntity } from "@/types/entities/product.entity"
import type { DialogProps } from "@radix-ui/react-dialog"
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductTypeValidator } from "@/validators/products/create-product-validator";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useGetListProductCategories } from "@/api/product-categories/get-list-product-categories-api";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends DialogProps {
  product?: ProductEntity | null
}

const EditProductModal = ({ product, onOpenChange, ...props }: Props) => {
  const queryClient = useQueryClient()
  const { data: productCategories } = useGetListProductCategories()
  const form = useForm({
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
      categoryId: 0
    },
    mode: "onChange",
    resolver: zodResolver(CreateProductTypeValidator)
  })


  useEffect(() => {
    if (product) {
      form.reset({
        name: product?.name || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        categoryId: product?.categoryId || 0
      })
    }
  }, [product, form])

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to your product here.
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
              <Button className="cursor-pointer" type="submit" >Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductModal