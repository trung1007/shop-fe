import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/services/authService";
import { LoginInput, RegisterInput } from "@/schemas/user.schema";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/auth/authSlice";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),
    onSuccess: (data) => {

      
      const { accessToken, user } = data;
      
      Cookies.set("access_token", accessToken);

      dispatch(setUser({ user, accessToken }));
    },
    onError: (error: any) => {
      console.error("Đăng nhập thất bại", error);
    },
  });
};
