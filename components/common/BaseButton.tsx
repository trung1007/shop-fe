import React from "react";

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton: React.FC<BaseButtonProps> = ({ children, className = "", ...rest }) => {
  return (
    <button
      className={`h-[40px] bg-black text-white rounded-md hover:bg-opacity-90 transition-all disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BaseButton;
