import DataTable from "@/components/DataTable";
import { columns, type ProductCategory } from "./Columns"
import SkeletonTableBasic from "@/components/SkeletonTableBasic";
import { useQuery } from "@tanstack/react-query";

const ProductCategoryPage = () => {
    const { data: products, isLoading, error } = useQuery<ProductCategory[]>({
        queryKey: ['product-categories'],
        queryFn: async (): Promise<ProductCategory[]> => {
            const res = await fetch('http://localhost:3000/product-categories')
            return res.json()
        }
    })

    if (error) return <div>Error: {error.message}</div>;

    return (

        <div className="w-full">
            <div className="flex flex-col gap-2">
                <h1>Product Categories</h1>
                {isLoading ? <SkeletonTableBasic /> : <DataTable columns={columns} data={products ?? []} />}
            </div>
        </div>
    )
}

export default ProductCategoryPage