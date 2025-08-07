import { z } from "zod";

export const CreateProductCategoryValidator = z.object({
  name: z.string().min(4, "Name too short"),
});

export type CreateProductCategoryValidatorType = z.infer<
  typeof CreateProductCategoryValidator
>;
