import { http } from "@/lib/axios";
import type { ProductEntity } from "@/types/entities/product.entity";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

interface DeleteProductApiBody {
  id: number;
}
export const deleteProductHandlerApi = async ({ id }: DeleteProductApiBody) => {
  const { data } = await http.delete(`/products/${id}`);

  return data;
};

export const useDeleteProduct = (
  options?: UseMutationOptions<ProductEntity, Error, DeleteProductApiBody>
) => {
  return useMutation({
    mutationFn: deleteProductHandlerApi,
    ...options,
  });
};
