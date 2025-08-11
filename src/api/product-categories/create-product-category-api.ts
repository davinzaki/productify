import { http } from "@/lib/axios";
import type { ProductCategoryEntity } from "@/types/entities/product-category.entity";
import type { CreateProductCategoryValidatorType } from "@/validators/product-categories/create-product-category-validator";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

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
    ProductCategoryEntity,
    Error,
    CreateProductCategoryValidatorType
  >
) => {
  return useMutation({
    mutationFn: createProductCategoryApiHandler,
    ...options,
  });
};
