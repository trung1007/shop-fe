import Icon from "@ant-design/icons";
import React from "react";
import { IconType } from "react-icons";
import Link from 'next/link';


export interface HoverDropdownOption {
  label: string;
  value: string;
  icon?: IconType;
  styleIcon?: string; 
}

interface HoverDropdownProps {
  label?: string;
  options: HoverDropdownOption[];
  style?: string;
  icon?: IconType;
  iconStyle?: string;
  dropdownWidth?: string;
}

const HoverDropdown: React.FC<HoverDropdownProps> = ({
  label,
  options,
  style,
  icon: Icon,
  iconStyle,
  dropdownWidth
}) => {
    console.log(dropdownWidth)
  return (
    <div className="relative group inline-block w-fit">
      <div className={`font-medium cursor-pointer ${style || ""}`}>
        {Icon && <Icon className={iconStyle || "mr-2"}/>}
        {label}
      </div>

      <ul
        className={`
          absolute mt-2 bg-white rounded-md full-shadow ${dropdownWidth || ""}
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-200 z-10 
        `}
      >
        {options.map((option, index) => (
            <Link
                key={index}
                href={option.value}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
            {option.icon && <option.icon className={option.styleIcon || "mr-2"} />}
            {option.label}
            </Link> 
        ))}
      </ul>
    </div>
  );
};

export default HoverDropdown;