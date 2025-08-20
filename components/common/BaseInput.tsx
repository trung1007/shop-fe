import React, { useEffect, useRef } from "react";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  as?: "input" | "textarea";
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BaseInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, BaseInputProps>(
  ({ label, error, required, as = "input", value, onChange, className = "", ...rest }, ref) => {
    const internalRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
      if (internalRef.current && value !== undefined) {
        internalRef.current.value = String(value);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if ((rest.type === "number" || rest.inputMode === "numeric") && as === "input") {
        const raw = e.target.value.replace(/,/g, "");
        if (!isNaN(Number(raw))) {
          const formatted = Number(raw).toLocaleString("en-US");
          e.target.value = formatted;
        }
      }

      onChange?.(e);
    };

    const commonClass = `
      appearance-none w-full px-4 pr-10 border border-gray-300 
      rounded-md outline-none focus:ring-2 focus:ring-black 
      transition-all duration-200 ${error ? "border-red-500" : ""} ${className}
    `;

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {as === "textarea" ? (
          <textarea
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as React.MutableRefObject<any>).current = node;
            }}
            className={`resize-none h-[80px] py-2 ${commonClass}`}
            value={value}
            onChange={handleChange}
            {...rest}
          />
        ) : (
          <input
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as React.MutableRefObject<any>).current = node;
            }}
            className={`h-[48px] ${commonClass}`}
            value={value}
            onChange={handleChange}
            {...rest}
          />
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
