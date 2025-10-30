import React from "react";

interface BaseCheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  checkedColor?: string;
  className?: string;
}

const BaseCheckBox: React.FC<BaseCheckBoxProps> = ({
  checked,
  onChange,
  label,
  checkedColor = "#4CAF50",
  className = "",
}) => {
  return (
    <label
      className={`flex items-center cursor-pointer select-none gap-2 ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span
        className="w-5 h-5 border-2 border-gray-400 flex items-center justify-center rounded"
        style={{
          backgroundColor: checked ? checkedColor : "transparent",
          borderColor: checked ? checkedColor : "#ccc",
          transition: "all 0.2s ease",
        }}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
};

export default BaseCheckBox;
