import z from "zod";

export const CreateProductTypeValidator = z.object({
  name: z.string().min(5, "Name too short!"),
  price: z.number(),
  stock: z.number(),
  categoryId: z.coerce.number().min(1, "Please select a category"),
});

export type CreateProductValidatorType = z.infer<
  typeof CreateProductTypeValidator
>;
