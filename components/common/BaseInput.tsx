import React from "react";

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, className = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="font-medium">{label}</label>}
        <input
          ref={ref}
          className={`h-[48px] px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black transition-all ${className}`}
          {...rest}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
