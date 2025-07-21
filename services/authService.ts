import api from "@/lib/axios";
import {
  LoginInput,
  RegisterInput,
  UpdateUserInput,
} from "@/schemas/user.schema";

export const registerUser = async (data: RegisterInput) => {
  const response = await api.post("/user/register", data);
  return response.data;
};

export const loginUser = async (data: LoginInput) => {
  const response = await api.post("/user/login", data);
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
