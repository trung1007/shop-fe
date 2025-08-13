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

export const ProductSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên sản phẩm"),
  description: z.string().min(1, "Vui lòng nhập mô tả"),
  price: z.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
  quantity: z.number().int().min(0, "Số lượng phải lớn hơn hoặc bằng 0"),
  type: z.string().optional(),
  imageDetails: z.array(z.instanceof(File)).nonempty("Vui lòng chọn ít nhất 1 ảnh"),
  imageThumbnails: z.array(z.instanceof(File)).nonempty("Vui lòng chọn ít nhất 1 ảnh"),
  categoryId: z.number().int().positive("Danh mục là bắt buộc"), // thêm nếu cần
});
// export const ProductSchema = z.object({
//   name: z.string(), // Không bắt min
//   description: z.string(), // Không bắt min
//   price: z.number(), // Không cần >= 0
//   quantity: z.number().int(), // Không cần >= 0
//   type: z.string().optional(), // Tùy chọn
//   image: z.string(), // Không kiểm tra URL
//   categoryId: z.number().int(), // Không cần positive
// });

export type CategoryInput = z.infer<typeof CategorySchema>;
export type ProductInput = z.infer<typeof ProductSchema>;
