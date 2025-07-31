"use client";

import BaseButton from "@/components/common/BaseButton";
import BaseInput from "@/components/common/BaseInput";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoginInput } from "@/schemas/user.schema";
import { useLogin } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();
  const { mutate, isPending } = useLogin();
  const router = useRouter();
  const onSubmit = (data: LoginInput) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Đăng nhập thành công");
        router.push("/");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.description || "Lỗi không xác định";
        console.log(errorMessage);

        toast.error(`Đăng nhập thất bại: ${errorMessage}`);
      },
    });
  };

  return (
    <div className="w-full flex justify-center py-10 bg-[#f0f3f8]">
      <div className="w-[95%] max-w-[480px] bg-white p-8 rounded-[12px] shadow-md">
        <h1 className="text-center text-[24px] md:text-[28px] font-bold mb-2">
          Đăng nhập tài khoản
        </h1>
        <p className="text-center text-sm text-[#666] mb-6">
          Bạn chưa có tài khoản ?{" "}
          <Link href="/register" className="underline font-medium">
            Đăng ký tại đây
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <BaseInput
            label="Email"
            id="email"
            placeholder="Email"
            error={errors.email?.message}
            {...register("email", { required: "Vui lòng nhập email" })}
          />

          <BaseInput
            label="Mật khẩu"
            id="password"
            placeholder="Mật khẩu"
            type="password"
            error={errors.password?.message}
            {...register("password", { required: "Vui lòng nhập mật khẩu" })}
          />

          <div className="text-sm text-left">
            Quên mật khẩu?{" "}
            <Link
              href="/forget-password"
              className="text-[#666] italic underline"
            >
              Nhấn vào đây
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#e60000] text-white font-bold py-3 rounded-full hover:bg-[#cc0000] transition-all"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="text-center my-4 text-[#444] text-sm">
          Hoặc đăng nhập bằng
        </div>

        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 bg-[#3b5998] text-white px-4  rounded  ">
            <div className="flex items-center justify-center ">
              <span className="text-lg border-r px-2">
                f
              </span>
            </div>
            Facebook
          </button>
          <button className="flex items-center gap-2 bg-[#db4437] text-white px-4 py-2 rounded">
            <div className="flex items-center justify-center ">
              <span className="text-lg border-r px-2">
                G+
              </span>
            </div>
           Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
