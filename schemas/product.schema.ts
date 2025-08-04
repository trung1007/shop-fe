import z from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  code: z.string().min(1, "Mã code không được để trống"),
  img: z
    .string()
    .url("Ảnh phải là một URL hợp lệ")
    .optional()
    .or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
