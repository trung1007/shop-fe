import { useRouter } from "next/navigation";
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { loginGoogle } from '@/services/authService';
import { toast } from "react-toastify";
import { useAuthMutation } from "@/hooks/useAuth";


const LoginGoogle = () => {
    const router = useRouter();
    const { mutate } = useAuthMutation(loginGoogle);
    return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const id_token = credentialResponse.credential;
          if (!id_token) {
            toast.error("Đăng nhập Google thất bại");
            return;
          }

          mutate(id_token, {
            onSuccess: () => {
              toast.success("Đăng nhập Google thành công");
              router.push("/");
            },
            onError: () => {
              toast.error("Lỗi đăng nhập Google");
            },
          });
        }}
        onError={() => {
          toast.error("Đăng nhập Google thất bại");
        }}
      />
    </div>
  );
}

export default LoginGoogle