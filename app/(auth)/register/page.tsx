"use client";

import BaseButton from "@/components/common/BaseButton";
import BaseInput from "@/components/common/BaseInput";
import { useForm } from "react-hook-form";
import Link from "next/link";

type RegisterFormInputs = {
    username: string;
    name: string,
    email: string,
    password: string;
    confirmPassword: string;
};

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<RegisterFormInputs>();

    const onSubmit = (data: RegisterFormInputs) => {
        console.log("Register data:", data);
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
                        {...register("name", { required: "Vui lòng nhập họ và tên" })}
                    />
                    <BaseInput
                        label="Tên đăng nhập"
                        id="username"
                        placeholder="Tên đăng nhập"
                        error={errors.username?.message}
                        {...register("username", { required: "Vui lòng nhập tên đăng nhập" })}
                    />
                    <BaseInput
                        label="email"
                        id="email"
                        placeholder="Email"
                        error={errors.email?.message}
                        {...register("email", { required: "Vui lòng nhập email" })}
                    />
                    <BaseInput
                        label="Mật khẩu"
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"
                        error={errors.password?.message}
                        {...register("password", { required: "Vui lòng nhập mật khẩu" })}
                    />

                    <BaseInput
                        label="Xác nhận mật khẩu"
                        id="confirmPassword"
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        error={
                            errors.confirmPassword?.message ||
                            (watch("confirmPassword") !== watch("password") ? "Mật khẩu không khớp" : undefined)
                        }
                        {...register("confirmPassword", {
                            required: "Vui lòng xác nhận mật khẩu",
                            validate: (val) =>
                                val === watch("password") || "Mật khẩu không khớp",
                        })}
                    />

                    <BaseButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                    </BaseButton>
                </form>

                <div className="w-full text-center">
                    <span className="text-[16px] font-medium text-[#667085]">
                        Bạn đã có tài khoản?{" "}
                    </span>
                    <Link href="/login" className="text-[16px] font-bold text-[#111111] hover:underline transition-all duration-200">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;