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
    const router = useRouter()
    const onSubmit = (data: LoginInput) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Đăng nhập thành công")
                router.push('/')
            },
            onError: (error: any) => {

                const errorMessage = error?.response?.data?.description || "Lỗi không xác định";
                console.log(errorMessage);

                toast.error(`Đăng nhập thất bại: ${errorMessage}`);
            },
        });
    };

    return (
        <div className="w-full min-h-[400px] h-fit mt-6 flex justify-center">
            <div className="w-[50vw] h-full px-10 py-4 rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] flex flex-col justify-center gap-4">
                <h1 className="text-[24px] font-bold mb-4">Đăng nhập</h1>
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

                    <BaseButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                    </BaseButton>
                </form>
                <div className="w-full text-right">
                    <Link href="/forget-password" className="text-[12px] font-medium italic text-[#667085] hover:underline transition-all duration-200">
                        Quên mật khẩu?
                    </Link>
                </div>
                  <div className="w-full text-center">
                    <span className="text-[16px] font-medium text-[#667085] " >Bạn chưa có tài khoản? </span>
                    <Link href="/register" className="text-[16px] font-bold text-[#111111] hover:underline transition-all duration-200">
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
