import { columns } from "./Columns"
import SkeletonTableBasic from "@/components/SkeletonTableBasic";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreateProductCategoryValidator, type CreateProductCategoryValidatorType } from "@/validators/product-categories/create-product-category-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateProductCategory } from "@/api/product-categories/create-product-category-api";
import { useGetListProductCategories } from "@/api/product-categories/get-list-product-categories-api";
import { useQueryClient } from "@tanstack/react-query";
import DataTable from "./DataTable";

const ProductCategoryPage = () => {
    const { data: productCategories, isLoading, error } = useGetListProductCategories()
    const queryClient = useQueryClient()
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

    // const [inputValue, setInputValue] = useState<string>('')
    // const [listItem, setListItem] = useState<string[]>([])

    // const handleAddList = () => {
    //     setListItem([...listItem, inputValue])
    // }
    // const handleAddListTwice = () => {
    //     setListItem([...listItem, inputValue])
    //     setListItem((prevItem) => [...prevItem, inputValue])
    // }




    const { register, handleSubmit, reset } = useForm<CreateProductCategoryValidatorType>({
        defaultValues: {
            name: ''
        },
        mode: "onChange",
        resolver: zodResolver(CreateProductCategoryValidator)
    })

    // const { mutate, isPending } = useMutation({
    //     mutationFn: async (body: CreateProductCategoryValidatorType) => {
    //         const res = await http.post('product-categories', body)
    //         console.log('res', res)
    //         return res
    //     },
    //     onSuccess: () => {
    //         reset();
    //         toast('Data saved succesfully!')
    //     }
    // })

    if (error) return <div>Error: {error.message}</div>;

    const onSubmit = handleSubmit((data) => {
        mutate({ ...data })
    })

    return (

        <div className="w-full">
            <div className="flex flex-col gap-5">
                <h1>Product Categories</h1>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" placeholder="Name" {...register("name")} />
                        </div>
                    </div>
                    <Button type="submit" disabled={isPending} >Save</Button>
                </form>
                {isLoading ? <SkeletonTableBasic /> : <DataTable columns={columns} data={productCategories ?? []} />}

                {/* <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

                <Button onClick={handleAddList}>add</Button>
                <Button onClick={handleAddListTwice}>add twice</Button>

                <ul>
                    {listItem.map((item, index) => (
                        <li key={index}>{index}, {item}</li>
                    ))}
                </ul> */}
            </div>
        </div>
    )
}

export default ProductCategoryPage