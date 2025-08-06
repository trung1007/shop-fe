import { useForm } from "react-hook-form";
import { LoginInput } from "@/schemas/user.schema";
import BaseInput from "@/components/common/BaseInput";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthMutation } from "@/hooks/useAuth";
import { loginUser } from "@/services/authService";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();

  const router = useRouter();
  const { mutate } = useAuthMutation(loginUser);

  const onSubmit = (data: LoginInput) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log("Response", res);
        if (res?.user?.roles?.some((role: any) => role.name === "ROLE_ADMIN")) {
          router.push("/admin");
          return;
        } else {
          router.push("/");
        }
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
        <Link href="/forget-password" className="text-[#666] italic underline">
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
  );
};

export default LoginForm;
