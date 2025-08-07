import DataTable from "@/components/DataTable";
import { columns } from "./Columns"
import SkeletonTableBasic from "@/components/SkeletonTableBasic";
import { useGetListProducts } from "@/api/products/get-list-products-api";

export const ProductPage = () => {
    const { data: products, isLoading, error } = useGetListProducts();
    // const [data, setData] = useState<Product[]>([])
    // const [loading, setLoading] = useState(true)

    // object desctructuring
    // const res = {
    //     data: [
    //         {
    //             name: 'adfadf',
    //         },
    //         {
    //             name: 'adfadf',
    //         },
    //         {
    //             name: 'adfadf',
    //         },
    //     ],
    //     status: 'OK'
    // }

    // const { data } = res

    // console.log('res', res)
    // console.log('data', data)


    // const { data: products, isLoading, error } = useQuery<Product[]>({
    //     queryKey: ['products'],
    //     queryFn: async (): Promise<Product[]> => {
    //         const res = await fetch('http://localhost:3000/products')

    //         return res.json()

    //         // fetch('http://localhost:3000/products').then((res) => {
    //         //     res.json()
    //         // })


    //     },
    //     // refetchOnWindowFocus: false

    //     // queryFn: async () => {
    //     //     const res = await fetch('http://localhost:3000/products')
    //     //     return await res.json()
    //     // }
    // })


    // useEffect(() => {

    //     fetch('http://localhost:3000/products').then((res) => {
    //         return res.json();
    //     }).then((data) => {
    //         console.log('data', data)
    //         setData(data);
    //         setLoading(false)
    //     })

    // }, [])

    if (error) return <div>Error: {error.message}</div>;


    return (

        <div className="w-full">
            <div className="flex flex-col gap-2">
                <h1>Products</h1>

                {isLoading ? <SkeletonTableBasic /> : <DataTable columns={columns} data={products ?? []} />}
            </div>
        </div>
    )
}

export default ProductPage
