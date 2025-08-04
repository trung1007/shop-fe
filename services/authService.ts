import api from "@/lib/axios";
import {
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  UpdateUserInput,
} from "@/schemas/user.schema";

export const registerUser = async (data: RegisterInput) => {
  console.log(data);
  
  const response = await api.post("/user/register", data);
  return response.data;
};

export const loginUser = async (data: LoginInput) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const updateUser = async (data: UpdateUserInput) => {
  const response = await api.put("/user/update", data);
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post(`/user/forgot-password`, null,{
    params: {
      email,
    },
  });
  return response.data;
};

export const resetPassword = async (data: ResetPasswordInput) => {
  const response = await api.post(`/user/reset-password`, data);
  return response.data;
};
