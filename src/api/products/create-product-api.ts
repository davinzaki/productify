import { http } from "@/lib/axios";
import type { CreateProductValidatorType } from "@/validators/products/create-product-validator";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

interface CreateProductApiResponse {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

export const createProductApiHandler = async ({
  ...body
}: CreateProductValidatorType): Promise<CreateProductApiResponse> => {
  const { data } = await http.post("/products", body);
  return data;
};

export const useCreateProduct = (
  options?: UseMutationOptions<
    CreateProductApiResponse,
    Error,
    CreateProductValidatorType
  >
) => {
  return useMutation({
    mutationFn: createProductApiHandler,
    ...options,
  });
};
