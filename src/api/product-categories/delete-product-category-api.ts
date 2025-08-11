import { http } from "@/lib/axios";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

interface DeleteProductCategoryApiResponse {
  id: number;
}

interface DeleteProductCategoryApiBody {
  id: number;
}
export const deleteProductCategoryHandlerApi = async ({
  id,
}: DeleteProductCategoryApiBody) => {
  const { data } = await http.delete(`/product-categories/${id}`);

  return data;
};

export const useDeleteProductCategory = (
  options?: UseMutationOptions<
    DeleteProductCategoryApiResponse,
    Error,
    DeleteProductCategoryApiBody
  >
) => {
  return useMutation({
    mutationFn: deleteProductCategoryHandlerApi,
    ...options,
  });
};
