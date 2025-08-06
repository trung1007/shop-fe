import React from "react";
import { DownOutlined } from "@ant-design/icons";

export interface DropdownOption {
  label: string;
  value: string | number;
}

interface BaseDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: DropdownOption[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const BaseDropdown = React.forwardRef<HTMLSelectElement, BaseDropdownProps>(
  (
    {
      label,
      error,
      options,
      required,
      className = "",
      isOpen,
      setIsOpen,
      ...rest
    },
    ref
  ) => {
    const handleOpen = () => {
      setIsOpen(!isOpen);
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
          <select
            ref={ref}
            onClick={handleOpen}
            className={`
              appearance-none h-[48px] w-full px-4 pr-10 border border-gray-300 
              rounded-md outline-none focus:ring-2 focus:ring-black 
              transition-all duration-200 ease-in-out
               ${className}
            `}
            {...rest}
          >
            <option value="">-- Chọn --</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom icon dropdown */}
          <div
            className={`
              pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500
              transition-transform duration-200 ease-in-out
              ${isOpen ? "rotate-180" : ""}
            `}
          >
            <DownOutlined />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

BaseDropdown.displayName = "BaseDropdown";

export default BaseDropdown;
