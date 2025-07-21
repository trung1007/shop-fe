import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, updateUser } from "@/services/authService";
import { LoginInput, RegisterInput, UpdateUserInput } from "@/schemas/user.schema";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser, setAccessToken, User } from "@/stores/auth/authSlice";

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
      console.log("data:", data);

      const { accessToken, user } = data;

      Cookies.set("access_token", accessToken);

      dispatch(setUser(user));
      dispatch(setAccessToken(accessToken));
    },
    onError: (error: any) => {
      console.error("Đăng nhập thất bại", error);
    },
  });
};

export const useUpdate = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data: UpdateUserInput) => updateUser(data),
    onSuccess: (updatedUser:User) => {
      dispatch(setUser(updatedUser));
    },
    onError: (error: any) => {
      console.error("Cập nhật thất bại", error);
    },
  });
};
