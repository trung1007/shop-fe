"use client";

import BaseButton from "@/components/common/BaseButton";
import BaseInput from "@/components/common/BaseInput";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { forgotPassword, resetPassword } from "@/services/authService";

type ForgetPasswordInput = {
  email: string;
};

type ResetPasswordInput = {
  password: string;
  confirmPassword: string;
};

const ForgotPasswordPage = () => {
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get("token");


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordInput>();

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset, isSubmitting: isSubmittingReset },
    watch,
  } = useForm<ResetPasswordInput>();

  const [sent, setSent] = useState(false);


  const onSubmit = async (data: ForgetPasswordInput) => {
    try {
      const payload = {
        email: data.email
      }
      await forgotPassword(payload);
      setSent(true);
      toast.success("Đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn");
    } catch (error: any) {
      console.error("Lỗi:", error?.response?.data?.message || error.message);
      toast.error(
        "Gửi yêu cầu thất bại: " +
        (error?.response?.data?.message || "Đã xảy ra lỗi")
      );
    }
  };

  const onResetPassword = async (data: ResetPasswordInput) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const payload = {
        resetPasswordToken: resetPasswordToken || undefined,
        newPassword: data.password,
      };

      await resetPassword(payload)

      toast.success("Đổi mật khẩu thành công!");
    } catch (error: any) {
      toast.error(
        "Đổi mật khẩu thất bại: " +
        (error?.response?.data?.message || "Đã xảy ra lỗi")
      );
    }
  };

  return (
    <div className="w-full min-h-[400px] h-fit mt-6 flex justify-center">
      <div className="w-[50vw] h-full px-10 py-4 rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] flex flex-col justify-center gap-4">
        <h1 className="text-[24px] font-bold mb-4">
          {resetPasswordToken ? "Đặt lại mật khẩu" : "Quên mật khẩu"}
        </h1>
        {resetPasswordToken ? (
          <form
            onSubmit={handleSubmitReset(onResetPassword)}
            className="flex flex-col gap-4 mt-2"
          >
            <BaseInput
              label="Mật khẩu mới"
              id="password"
              placeholder="Nhập mật khẩu mới"
              type="password"
              error={errorsReset.password?.message}
              {...registerReset("password", {
                required: "Vui lòng nhập mật khẩu mới",
                minLength: {
                  value: 6,
                  message: "Mật khẩu cần ít nhất 6 ký tự",
                },
              })}
            />
            <BaseInput
              label="Xác nhận mật khẩu"
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              type="password"
              error={errorsReset.confirmPassword?.message}
              {...registerReset("confirmPassword", {
                required: "Vui lòng xác nhận lại mật khẩu",
              })}
            />
            <BaseButton type="submit" disabled={isSubmittingReset}>
              {isSubmittingReset ? "Đang xử lý..." : "Đổi mật khẩu"}
            </BaseButton>
          </form>
        ) : sent ? (
          <div className="text-green-600 text-sm mt-4">
            Hướng dẫn đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.
          </div>
        ) : (
          <>
            <p className="text-[#667085] text-sm">
              Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mt-2"
            >
              <BaseInput
                label="Email"
                id="email"
                placeholder="Email"
                error={errors.email?.message}
                {...register("email", { required: "Vui lòng nhập email" })}
              />
              <BaseButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi..." : "Gửi hướng dẫn"}
              </BaseButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
