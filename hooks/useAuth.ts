import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { LoginInput, RegisterInput } from "@/schemas/user.schema";
import { loginUser, registerUser } from "@/services/authService";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),
  });
};