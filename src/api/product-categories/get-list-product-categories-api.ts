import { http } from "@/lib/axios";
import type { ProductCategory } from "@/pages/product-categories/Columns";
import { useQuery } from "@tanstack/react-query";

export const getListProductCategoriesApiHandler = async (): Promise<
  ProductCategory[]
> => {
  const { data } = await http.get("/product-categories");

  return data;
};

export const useGetListProductCategories = () => {
  return useQuery<ProductCategory[]>({
    queryKey: ["product-categories"],
    queryFn: getListProductCategoriesApiHandler,
  });
};
