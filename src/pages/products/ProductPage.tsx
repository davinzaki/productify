import { useEffect, useState } from "react"
import { columns, type Product } from "./Columns"
import DataTable from "./DataTable";

export const ProductPage = () => {
    const [data, setData] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {

            const res: Product[] = [
                {
                    id: 1,
                    name: 'Lord of the Mysteries',
                    stock: 15,
                    price: 100000,
                },
                {
                    id: 2,
                    name: 'The Hobbit',
                    stock: 10,
                    price: 85000,
                },
                {
                    id: 3,
                    name: 'Harry Potter and the Sorcerer\'s Stone',
                    stock: 8,
                    price: 95000,
                },
                {
                    id: 4,
                    name: 'The Name of the Wind',
                    stock: 5,
                    price: 120000,
                },
                {
                    id: 5,
                    name: '1984',
                    stock: 12,
                    price: 75000,
                },
                {
                    id: 6,
                    name: 'To Kill a Mockingbird',
                    stock: 9,
                    price: 80000,
                },
                {
                    id: 7,
                    name: 'The Great Gatsby',
                    stock: 7,
                    price: 78000,
                },
                {
                    id: 8,
                    name: 'Mistborn: The Final Empire',
                    stock: 6,
                    price: 110000,
                },
                {
                    id: 9,
                    name: 'The Catcher in the Rye',
                    stock: 11,
                    price: 72000,
                },
                {
                    id: 10,
                    name: 'Pride and Prejudice',
                    stock: 14,
                    price: 83000,
                },
            ];

            setData(res)
            setLoading(false)
        }

        fetchData();
    }, [])


    return (

        <div className="w-full">
            <div className="flex items-center py-4">
                {loading ? <p>Loading...</p> : <DataTable columns={columns} data={data} />}
            </div>
        </div>
    )
}

export default ProductPage