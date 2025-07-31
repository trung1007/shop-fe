import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, className = "", type, required, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="flex flex-col gap-2 relative">
        {label && (
          <label className="font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`h-[48px] w-full px-4 pr-10 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black transition-all ${className}`}
            {...rest}
          />
          {isPassword && (
            <span
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
