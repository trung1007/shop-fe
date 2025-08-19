import React, { useState } from "react";
import { IconType } from "react-icons";
import Link from "next/link";

export interface HoverDropdownOption {
  label: string;
  value: string;
  icon?: IconType;
  styleIcon?: string;
  childrenOptions?: ChildrenDropDownOptions[];
}

interface ChildrenDropDownOptions {
  label: string;
  value: string;
}

interface HoverDropdownProps {
  label?: string;
  options: HoverDropdownOption[];
  style?: string;
  icon?: IconType;
  iconStyle?: string;
  dropdownWidth?: string;
  uppercase?: boolean;
}

const HoverDropdown: React.FC<HoverDropdownProps> = ({
  label,
  options,
  style,
  icon: Icon,
  iconStyle,
  dropdownWidth,
  uppercase,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="relative group inline-block w-fit"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Nút mở dropdown */}
      <div className={`font-medium cursor-pointer ${style || ""}`}>
        {Icon && <Icon className={iconStyle || "mr-2"} />}
        {label}
      </div>

      {/* Dropdown menu */}
      <div
        className={`
          absolute mt-2 bg-white flex gap-1 rounded-md
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-200 z-1000
        `}
      >
        {/* Cột bên trái */}
        <div className={`rounded-md full-shadow ${dropdownWidth || ""}`}>
          {options.map((option, index) => {
            const hasChildren =
              option.childrenOptions && option.childrenOptions.length > 0;

            return (
              <Link
                key={index}
                href={
                  hasChildren
                    ? `/products/${option.value}`
                    : `/products/${option.value}`
                }
                className={`w-full flex items-center ${
                  uppercase ? "uppercase" : ""
                } px-4 py-2 text-sm text-gray-700 hover:text-white ${
                  hoveredIndex === index ? "bg-emerald-500 text-white" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {option.icon && (
                  <option.icon className={option.styleIcon || "mr-2"} />
                )}
                {option.label}
              </Link>
            );
          })}
        </div>

        {/* Cột children bên phải */}
        {hoveredIndex !== null &&
          options[hoveredIndex]?.childrenOptions &&
          options[hoveredIndex].childrenOptions!.length > 0 && (
            <div className="rounded-md grid grid-cols-4 gap-4 w-200 full-shadow px-[5%]">
              {options[hoveredIndex].childrenOptions!.map((sub, i) => (
                <Link
                  key={i}
                  href={`/products/${options[hoveredIndex].value}/${sub.value}`}
                  className={`text-emerald-600 cursor-pointer hover:underline ${
                    uppercase ? "uppercase" : ""
                  }`}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default HoverDropdown;
