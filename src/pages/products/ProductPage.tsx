import { useEffect, useState } from "react"
import { columns, type Product } from "./Columns"
import DataTable from "./DataTable";
import SkeletonTableBasic from "@/components/SkeletonTableBasic";

export const ProductPage = () => {
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch('http://localhost:3000/products').then((res) => {
            return res.json();
        }).then((data) => {
            console.log('data', data)
            setData(data);
            setLoading(false)
        })

    }, [])


    return (

        <div className="w-full">
            <div className="flex flex-col gap-2">
                <h1>Products</h1>
                {loading ? <SkeletonTableBasic /> : <DataTable columns={columns} data={data} />}
            </div>
        </div>
    )
}

export default ProductPage
