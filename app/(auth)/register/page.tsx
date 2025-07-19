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
    const password = watch("password");
    const router = useRouter()

    const onSubmit = (data: RegisterInput) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Đăng ký thành công")
                router.push('/login')
            },
            onError: (error: any) => {
                alert("Đăng ký thất bại: " + error?.message);
            },
        });
    };

    return (
        <div className="w-full min-h-[400px] h-fit mt-6 flex justify-center">
            <div className="w-[50vw] h-full px-10 py-4 rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.05)] flex flex-col justify-center gap-4">
                <h1 className="text-[24px] font-bold mb-4">Đăng ký</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <BaseInput
                        label="Họ và tên"
                        id="name"
                        placeholder="Họ và tên"
                        error={errors.name?.message}
                        {...register("name")}
                    />
                    <BaseInput
                        label="Tên đăng nhập"
                        id="username"
                        placeholder="Tên đăng nhập"
                        error={errors.username?.message}
                        {...register("username")}
                    />
                    <BaseInput
                        label="Email"
                        id="email"
                        placeholder="Email"
                        error={errors.email?.message}
                        {...register("email")}
                    />
                    <BaseInput
                        label="Mật khẩu"
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"
                        error={errors.password?.message}
                        {...register("password")}
                    />
                    <BaseInput
                        label="Xác nhận mật khẩu"
                        id="confirmPassword"
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        error={
                            errors.confirmPassword?.message ||
                            (watch("confirmPassword") !== password ? "Mật khẩu không khớp" : undefined)
                        }
                        {...register("confirmPassword")}
                    />

                    <BaseButton type="submit" disabled={isPending}>
                        {isPending ? "Đang xử lý..." : "Đăng ký"}
                    </BaseButton>
                </form>

                <div className="w-full text-center">
                    <span className="text-[16px] font-medium text-[#667085]">
                        Bạn đã có tài khoản?{" "}
                    </span>
                    <Link
                        href="/login"
                        className="text-[16px] font-bold text-[#111111] hover:underline transition-all duration-200"
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
