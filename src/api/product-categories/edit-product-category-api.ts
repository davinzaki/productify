import { http } from "@/lib/axios";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

interface EditProductCategoryApiResponse {
  id: number;
  name: string;
}

interface EditProductCategoryApiBody {
  id: number;
  name: string;
}

export const editProductCategoryHandlerApi = async ({
  id,
  ...body
}: EditProductCategoryApiBody): Promise<EditProductCategoryApiResponse> => {
  const { data } = await http.patch(`/product-categories/${id}`, body);

  return data;
};

export const useEditProductCategory = (
  options?: UseMutationOptions<
    EditProductCategoryApiResponse,
    Error,
    EditProductCategoryApiBody
  >
) => {
  return useMutation({
    mutationFn: editProductCategoryHandlerApi,
    ...options,
  });
};
