"use client";

import Link from "next/link";
import LoginForm from "@/components/login/loginForm";
import LoginGoogle from "@/components/login/loginGoole";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LoginPage = () => {
  return (
    <GoogleOAuthProvider clientId="719640243167-96ccvc09mujv9m4cqjd15elut9dcgbmk.apps.googleusercontent.com">
      <div className="w-full flex justify-center py-10 bg-[#f0f3f8]">
        <div className="w-[95%] max-w-[480px] bg-white p-8 rounded-[12px] shadow-md">
          <h1 className="text-center text-[24px] md:text-[28px] font-bold mb-2">
            Đăng nhập tài khoản
          </h1>
          <p className="text-center text-sm text-[#666] mb-6">
            Bạn chưa có tài khoản ?{" "}
            <Link href="/register" className="underline font-medium">
              Đăng ký tại đây
            </Link>
          </p>

          <LoginForm />
          <div className="text-center my-4 text-[#444] text-sm">
            Hoặc đăng nhập bằng
          </div>

          <div className="flex justify-center gap-4">
            {/* <button className="flex items-center gap-2 bg-[#3b5998] text-white px-4  rounded  ">
              <div className="flex items-center justify-center ">
                <span className="text-lg border-r px-2">
                  f
                </span>
              </div>
              Facebook
            </button> */}
            <LoginGoogle />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>

  );
};

export default LoginPage;