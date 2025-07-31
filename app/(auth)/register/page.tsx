"use client";

import BaseButton from "@/components/common/BaseButton";
import BaseInput from "@/components/common/BaseInput";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterInput } from "@/schemas/user.schema";
import { useRegister } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate, isPending } = useRegister();
  const router = useRouter();

  const onSubmit = (data: RegisterInput) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Đăng ký thành công");
        router.push("/login");
      },
      onError: (error: any) => {
        toast.error("Đăng ký thất bại:", error?.message);
      },
    });
  };

  return (
    <div className="w-full flex justify-center py-10 bg-[#f0f3f8]">
      <div className="w-[95%] max-w-[540px] bg-white p-8 rounded-[12px] shadow-lg">
        <h1 className="text-center text-[24px] md:text-[28px] font-bold mb-2">
          Đăng ký tài khoản
        </h1>
        <p className="text-center text-sm text-[#666] mb-4">
          Bạn đã có tài khoản ?{" "}
          <Link href="/login" className="underline font-medium">
            Đăng nhập tại đây
          </Link>
        </p>

        <h2 className="text-sm font-bold mb-2 text-center">
          Thông tin cá nhân
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <BaseInput
            label="Họ và tên"
            id="name"
            placeholder="Họ và tên"
            required
            error={errors.name?.message}
            {...register("name")}
          />
          <BaseInput
            label="Số điện thoại"
            id="phone"
            required
            placeholder="Số điện thoại"
            error={errors.phone?.message}
            {...register("phone", { required: "Vui lòng nhập số điện thoại" })}
          />
          <BaseInput
            label="Email"
            id="email"
            required
            placeholder="Email"
            error={errors.email?.message}
            {...register("email", { required: "Vui lòng nhập email" })}
          />
          <BaseInput
            label="Mật khẩu"
            id="password"
            required
            type="password"
            placeholder="Mật khẩu"
            error={errors.password?.message}
            {...register("password", { required: "Vui lòng nhập mật khẩu" })}
          />

          <button
            type="submit"
            disabled={isPending}
            className="bg-[#e60000] text-white font-bold py-3 rounded-full hover:bg-[#cc0000] transition-all"
          >
            {isPending ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <div className="text-center my-4 text-[#444] text-sm">
          Hoặc đăng nhập bằng
        </div>

        <div className="flex justify-center gap-4">
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
      </div>
    </div>
  );
};

export default RegisterPage;
