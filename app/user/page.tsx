"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutUser } from "@/stores/auth/authSlice";
import Cookies from "js-cookie";
import SideBarInfor from "@/components/ui/SideBarInfor";
import { useForm } from "react-hook-form";
import { useUpdate } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { logout } from "@/services/authService";

type FormValues = {
  name: string;
  phone: string;
  email: string;
};

const UserInfoPage = () => {
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
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (!user && !isLoggingOut) {
      router.push("/login");
    } else if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    }
  }, [user, isLoggingOut, reset, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const refreshToken = Cookies.get("refresh_token");
      if (!refreshToken) {
        console.error("No refresh token found");
        return;
      }

      await logout(refreshToken);
      console.log("Logging out with refresh token:", refreshToken);
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
      dispatch(logoutUser());
      setTimeout(() => router.push("/login"), 1000);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const onSubmit = (data: FormValues) => {
    const updateUser = { id: Number(user?.id), ...data };
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
          <>
            <h2 className="text-2xl font-bold mb-6">THÔNG TIN KHÁCH HÀNG</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <label className="block font-medium mb-1">
                  Họ và tên của bạn
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Số điện thoại</label>
                <input
                  type="text"
                  {...register("phone")}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="col-span-full">
                <button
                  type="submit"
                  disabled={!isDirty}
                  className={`mt-6 px-4 py-2 rounded text-white transition-all ${
                    isDirty
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
          </>
        )}
      </main>
    </div>
  );
};

export default UserInfoPage;
