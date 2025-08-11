import { columns } from "../../components/features/product-categories/Columns"
import SkeletonTableBasic from "@/components/shared/SkeletonTableBasic";
import { useGetListProductCategories } from "@/api/product-categories/get-list-product-categories-api";
import { ProductCategoryTable } from "@/components/features/product-categories";

const ProductCategoryPage = () => {
    const { data: productCategories, isLoading, error } = useGetListProductCategories()

    // const [inputValue, setInputValue] = useState<string>('')
    // const [listItem, setListItem] = useState<string[]>([])

    // const handleAddList = () => {
    //     setListItem([...listItem, inputValue])
    // }
    // const handleAddListTwice = () => {
    //     setListItem([...listItem, inputValue])
    //     setListItem((prevItem) => [...prevItem, inputValue])
    // }

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

    return (
        <>
            <div className="w-full h-full flex-1 flex-col gap-8 p-8 md:flex">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Product Categories
                        </h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of product categories.
                        </p>
                    </div>
                    {/* <div className="flex items-center gap-2">
                        <UserNav />
                    </div> */}
                </div>
                {isLoading ? <SkeletonTableBasic /> : <ProductCategoryTable columns={columns} data={productCategories ?? []} />}
            </div >
            {/* <div className="w-full">
            <div className="flex flex-col gap-5">
                <h1>Product Categories</h1>
                
        </div> */}
        </>
    )
}

export default ProductCategoryPage