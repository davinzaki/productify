import { http } from "@/lib/axios";
import type { ProductEntity } from "@/types/entities/product.entity";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

interface EditProductApiBody {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

export const editProductApiHandler = async ({
  id,
  ...body
}: EditProductApiBody): Promise<ProductEntity> => {
  const { data } = await http.patch(`/products/${id}`, body);

  return data;
};

export const useEditProduct = (
  options?: UseMutationOptions<ProductEntity, Error, EditProductApiBody>
) => {
  return useMutation({
    mutationFn: editProductApiHandler,
    ...options,
  });
};
