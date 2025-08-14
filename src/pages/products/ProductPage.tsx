import { columns } from "../../components/features/products/Columns"
import SkeletonTableBasic from "@/components/shared/SkeletonTableBasic";
import { useGetListProducts } from "@/api/products/get-list-products-api";
import DataTable from "@/components/features/products/DataTable";

export const ProductPage = () => {
    const { data: products, isLoading, error } = useGetListProducts();

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
                {isLoading ? <SkeletonTableBasic /> : <DataTable columns={columns} data={products ?? []} />}
            </div>
        </>
    )
}

export default ProductPage
