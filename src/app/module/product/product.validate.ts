import { z } from "zod";

const productValidateSchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty("Name is required"),
    description: z.string().trim().nonempty("Description is required"),
    category: z.string().trim().nonempty("Category is required"),
    brand: z.string().trim().nonempty("Brand is required"),
    stockQuantity: z.number().min(0, "Stock quantity must be at least 0"),
    rating: z
      .number()
      .min(0, "Rating must be between 0 and 5")
      .max(5, "Rating must be between 0 and 5"),
    price: z.number().min(0, "Price must be at least 0"),
    image: z.string().trim().url("Image must be a valid URL"),
  }),
});

const UpdateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty("Name is required").optional(),
  description: z.string().trim().nonempty("Description is required").optional(),
  category: z.string().trim().nonempty("Category is required").optional(),
  brand: z.string().trim().nonempty("Brand is required").optional(),
  stockQuantity: z
    .number()
    .min(0, "Stock quantity must be at least 0")
    .optional(),
  rating: z
    .number()
    .min(0, "Rating must be between 0 and 5")
    .max(5, "Rating must be between 0 and 5")
    .optional(),
  price: z.number().min(0, "Price must be at least 0").optional(),
  image: z.string().trim().url("Image must be a valid URL").optional(),
  })
});

// Export the Zod schema
export const productValidation = {
  productValidateSchema,
  UpdateProductValidationSchema,
};
