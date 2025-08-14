import { persistor } from "@/stores/store";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // tránh loop vô hạn

      try {
        // Gọi API refresh token
        const refreshToken = Cookies.get("refresh_token");
        if (!refreshToken) {
          // Không có refresh token => logout
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          persistor.purge();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refreshToken`,
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;
        Cookies.set("access_token", newAccessToken);

        // Gắn token mới vào header và gọi lại request cũ
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh thất bại => logout
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        persistor.purge();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
