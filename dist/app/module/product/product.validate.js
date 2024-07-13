"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const productValidateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().nonempty("Name is required"),
        description: zod_1.z.string().trim().nonempty("Description is required"),
        category: zod_1.z.string().trim().nonempty("Category is required"),
        brand: zod_1.z.string().trim().nonempty("Brand is required"),
        stockQuantity: zod_1.z.number().min(0, "Stock quantity must be at least 0"),
        rating: zod_1.z
            .number()
            .min(0, "Rating must be between 0 and 5")
            .max(5, "Rating must be between 0 and 5"),
        price: zod_1.z.number().min(0, "Price must be at least 0"),
        image: zod_1.z.string().trim().url("Image must be a valid URL"),
    }),
});
const UpdateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().nonempty("Name is required").optional(),
        description: zod_1.z.string().trim().nonempty("Description is required").optional(),
        category: zod_1.z.string().trim().nonempty("Category is required").optional(),
        brand: zod_1.z.string().trim().nonempty("Brand is required").optional(),
        stockQuantity: zod_1.z
            .number()
            .min(0, "Stock quantity must be at least 0")
            .optional(),
        rating: zod_1.z
            .number()
            .min(0, "Rating must be between 0 and 5")
            .max(5, "Rating must be between 0 and 5")
            .optional(),
        price: zod_1.z.number().min(0, "Price must be at least 0").optional(),
        image: zod_1.z.string().trim().url("Image must be a valid URL").optional(),
    })
});
// Export the Zod schema
exports.productValidation = {
    productValidateSchema,
    UpdateProductValidationSchema,
};
