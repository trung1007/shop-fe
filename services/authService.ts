import axios from "@/lib/axios";
import { LoginInput, RegisterInput } from "@/schemas/user.schema";

export const registerUser = async (data: RegisterInput) => {
  const response = await axios.post("/user/register", data);
  return response.data;
};

export const loginUser = async (data: LoginInput) => {
  const response = await axios.post("/user/login", data);
  return response.data;
};