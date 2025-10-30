"use client";

import BaseButton from "@/components/common/BaseButton";
import BaseInput from "@/components/common/BaseInput";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const route = useRouter();

  const onSubmit = async (data: ForgetPasswordInput) => {
    try {
      const payload = data.email;
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

      await resetPassword(payload);

      toast.success("Đổi mật khẩu thành công!");
      route.push("/login");
    } catch (error: any) {
      toast.error(
        "Đổi mật khẩu thất bại: " +
          (error?.response?.data?.message || "Đã xảy ra lỗi")
      );
    }
  };

  const goToLogin = () => {
    route.push("/login");
  };

  return (
    <div className="w-full min-h-[400px] h-fit flex justify-center items-center bg-[#f6f7fb] py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Đăng nhập tài khoản
        </h1>
        <p className="text-center text-sm text-gray-600 mb-4">
          Bạn chưa có tài khoản?{" "}
          <span
            onClick={() => route.push("/register")}
            className="text-blue-600 underline"
          >
            Đăng ký tại đây
          </span>
        </p>

        <h2 className="text-center font-semibold mb-2 text-base">
          {resetPasswordToken ? "Đặt lại mật khẩu" : "Đặt lại mật khẩu"}
        </h2>
        {!resetPasswordToken && !sent && (
          <p className="text-center text-sm text-gray-600 mb-4">
            Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật
            khẩu.
          </p>
        )}

        {resetPasswordToken ? (
          <form
            onSubmit={handleSubmitReset(onResetPassword)}
            className="flex flex-col gap-4"
          >
            <BaseInput
              label="Mật khẩu mới"
              type="password"
              placeholder="Nhập mật khẩu mới"
              error={errorsReset.password?.message}
              {...registerReset("password", {
                required: "Vui lòng nhập mật khẩu mới",
                minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
              })}
            />
            <BaseInput
              label="Xác nhận mật khẩu"
              type="password"
              placeholder="Nhập lại mật khẩu"
              error={errorsReset.confirmPassword?.message}
              {...registerReset("confirmPassword", {
                required: "Vui lòng xác nhận mật khẩu",
              })}
            />
            <BaseButton
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmittingReset ? "Đang xử lý..." : "Đổi mật khẩu"}
            </BaseButton>
            <span onClick={goToLogin} className="text-blue-600 underline">
              Quay lại
            </span>
          </form>
        ) : sent ? (
          <div className="text-green-600 text-center text-sm mt-6">
            Hướng dẫn đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <BaseInput
              label="Email"
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              {...register("email", { required: "Vui lòng nhập email" })}
            />
            <BaseButton
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? "Đang gửi..." : "Lấy lại mật khẩu"}
            </BaseButton>
            <span onClick={goToLogin} className="text-blue-600 underline">
              Quay lại
            </span>
          </form>
        )}

        {!resetPasswordToken && (
          <div className="flex justify-center gap-4 mt-4">
            <button className="flex items-center gap-2 bg-[#3b5998] text-white px-4  rounded  ">
              <div className="flex items-center justify-center ">
                <span className="text-lg border-r px-2">f</span>
              </div>
              Facebook
            </button>
            <button className="flex items-center gap-2 bg-[#db4437] text-white px-4 py-2 rounded">
              <div className="flex items-center justify-center ">
                <span className="text-lg border-r px-2">G+</span>
              </div>
              Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
