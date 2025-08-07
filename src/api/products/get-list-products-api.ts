import { http } from "@/lib/axios";
import type { Product } from "@/pages/products/Columns";
import { useQuery } from "@tanstack/react-query";

export const getListProductsApiHandler = async (): Promise<Product[]> => {
  const { data } = await http.get("/products");

  return data;
};

export const useGetListProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getListProductsApiHandler,
  });
};
