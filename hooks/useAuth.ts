import { useMutation } from "@tanstack/react-query";
import {
  getUser,
  loginUser,
  logout,
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
  logoutUser,
} from "@/stores/auth/authSlice";
import { persistor } from "@/stores/store";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
  });
};

export const useAuthMutation = (mutationFn: (data: any) => Promise<any>) => {
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
};

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

export const useLogout = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (refreshToken: string) => logout(refreshToken),
    onSuccess: async () => {
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
      dispatch(logoutUser());
      persistor.purge();
    },
    onError: (error: any) => {
      console.error("Cập nhật thất bại", error.message);
    },
  });
};
