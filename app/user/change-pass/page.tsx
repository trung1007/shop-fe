"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/stores/auth/authSlice";
import Cookies from "js-cookie";
import SideBarInfor from "@/components/ui/SideBarInfor";
import { useForm } from "react-hook-form";
import { useUpdate } from "@/hooks/useAuth";
import { toast } from "react-toastify";

type ChangePassForm = {
    current: string;
    new: string;
    confirm: string;
};

const ChangePassPage = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { mutate, isPending } = useUpdate();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isDirty },
    } = useForm<ChangePassForm>({
        defaultValues: {
            current: "",
            new: "",
            confirm: "",
        },
    });

    useEffect(() => {
        if (!user && !isLoggingOut) {
            router.push("/login");
        } else if (user) {
            reset({
                current: "",
                new: "",
                confirm: "",
            });
        }
    }, [user, isLoggingOut, reset, router]);

    const handleLogout = () => {
        setIsLoggingOut(true);
        Cookies.remove("access_token");
        dispatch(logout());
        setTimeout(() => router.push("/login"), 1000);
    };

    const onSubmit = (data: ChangePassForm) => {
        const updateUser = { id: Number(user?.id), password: data.confirm };
        mutate(updateUser, {
            onSuccess: () => {
                toast.success("cập nhật thành công thành công");
            },
            onError: (error: any) => {
                toast.error("Đăng nhập thất bại:", error?.message);
            },
        });
    };

    return (
        <div className="flex flex-col md:flex-row p-8 gap-8">
            <SideBarInfor handleLogout={handleLogout} />

            <main className="flex-1 bg-white p-6 rounded shadow-sm">
                {isLoggingOut || isPending ? (
                    <div className="text-center text-lg font-medium text-gray-500 animate-pulse">
                        {isLoggingOut ? "Đang đăng xuất..." : "Đang cập nhật..."}
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-6 uppercase ">Thay đổi mật khẩu</h2>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                        >
                            <div>
                                <label className="block font-medium mb-1">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    type="text"
                                    {...register("current")}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Mật khẩu mới</label>
                                <input
                                    type="text"
                                    {...register("new")}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Xác nhận mật khẩu</label>
                                <input
                                    type="text"
                                    {...register("confirm")}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <div className="col-span-full">
                                <button
                                    type="submit"
                                    disabled={!isDirty}
                                    className={`mt-6 px-4 py-2 rounded text-white transition-all ${isDirty
                                            ? "bg-black hover:bg-gray-800"
                                            : "bg-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Lưu thông tin
                                </button>
                            </div>
                        </form>

                        <h2 className="text-xl font-bold mt-10 mb-4">ĐỊA CHỈ GIAO HÀNG</h2>
                        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                            Thêm địa chỉ mới
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ChangePassPage;
