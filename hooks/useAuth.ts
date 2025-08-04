import { useMutation } from "@tanstack/react-query";
import {
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "@/services/authService";
import {
  LoginInput,
  RegisterInput,
  UpdateUserInput,
} from "@/schemas/user.schema";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  setUser,
  setAccessToken,
  setRefreshToken,
  User,
} from "@/stores/auth/authSlice";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
  });
};

export const useAuthMutation = (
  mutationFn: (data: any) => Promise<any>
) =>  {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      const { token, user } = data;

      Cookies.set("access_token", token?.accessToken);
      Cookies.set("refresh_token", token?.refreshToken);

      dispatch(setAccessToken(token?.accessToken));
      dispatch(setRefreshToken(token?.refreshToken));
      dispatch(setUser(user));
    },
    onError: (error: any) => {
      console.error("Đăng nhập thất bại", error);
    },
  });
}

export const useUpdate = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data: UpdateUserInput) => updateUser(data),
    onSuccess: async (_res, variables: UpdateUserInput) => {
      const newUser = await getUser(variables.id);

      dispatch(setUser(newUser));
    },
    onError: (error: any) => {
      console.error("Cập nhật thất bại", error.message);
    },
  });
};
