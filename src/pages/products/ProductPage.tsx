import { useEffect, useState } from "react"
import { columns, type Product } from "./Columns"
import { DataTable } from "./DataTable"

const ProductPage = () => {
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {

            const res: Product[] = [
                {
                    id: 1,
                    name: 'LOTM',
                    price: 100000,
                    stock: 10
                }
            ]

            setData(res)
            setLoading(false)
        }

        fetchData();
    }, [])


    return (
        <div className="container mx-auto py-10">
            {loading ? <p>Loading...</p> : <DataTable columns={columns} data={data} />}
        </div>
    )
}

export default ProductPage