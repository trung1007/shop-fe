import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Vui lòng nhập họ và tên"),
    username: z.string().min(1, "Vui lòng nhập tên đăng nhập"),
    email: z.string().email("Email không hợp lệ"),
    phone: z.string().min(1, "Vui lòng nhập số điện thoại"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });
export const LoginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export const UpdateSchema = z.object({
  id: z.number().refine((val) => val !== undefined, {
    message: "Thiếu ID người dùng",
  }),
  email: z.string().email("Email không hợp lệ").optional(),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự").optional(),
  phone: z.string().min(8, "Số điện thoại không hợp lệ").optional(),
  name: z.string().min(1, "Họ tên không được để trống").optional(),
});

export const ResetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự").optional(),
  resetPasswordToken: z.string().optional()
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type UpdateUserInput = z.infer<typeof UpdateSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>
