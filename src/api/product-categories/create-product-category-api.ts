import { http } from "@/lib/axios";
import type { CreateProductCategoryValidatorType } from "@/validators/product-categories/create-product-category-validator";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

interface CreateProductCategoryApiResponse {
  id: number;
  name: string;
}
interface CreateProductCategoryApiBody {
  name: string;
}

export const createProductCategoryApiHandler = async ({
  ...body
}: CreateProductCategoryApiBody) => {
  const { data } = await http.post("/product-categories", body);

  return data;
};

export const useCreateProductCategory = (
  options?: UseMutationOptions<
    CreateProductCategoryApiResponse,
    Error,
    CreateProductCategoryValidatorType
  >
) => {
  return useMutation({
    mutationFn: createProductCategoryApiHandler,
    ...options,
  });
};
