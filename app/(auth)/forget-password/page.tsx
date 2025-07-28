"use client";

import BaseButton from "@/components/common/BaseButton";
import BaseInput from "@/components/common/BaseInput";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

type ForgetPasswordInput = {
  email: string;
};

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordInput>();

  const [sent, setSent] = useState(false);

  const onSubmit = async (data: ForgetPasswordInput) => {
    const email = data.email;

    try {
      const params = new URLSearchParams();
      params.append("email", email);
      await axios.post(
        "http://localhost:8181/user/forgot-password",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      toast.success("Đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn");
    } catch (error: any) {
      // Xử lý nếu gửi thất bại
      console.error("Lỗi:", error?.response?.data?.message || error.message);
      toast.error(
        "Gửi yêu cầu thất bại: " +
          (error?.response?.data?.message || "Đã xảy ra lỗi")
      );
    }
  };

  return (
    <div className="w-full min-h-[400px] h-fit mt-6 flex justify-center">
      <div className="w-[50vw] h-full px-10 py-4 rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] flex flex-col justify-center gap-4">
        <h1 className="text-[24px] font-bold mb-4">Quên mật khẩu</h1>
        <p className="text-[#667085] text-sm">
          Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
        </p>

        {sent ? (
          <div className="text-green-600 text-sm mt-4">
            Hướng dẫn đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
