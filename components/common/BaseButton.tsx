import React from "react";
import clsx from "clsx";

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ children, className = "", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "h-[40px] bg-black text-white rounded-md hover:bg-opacity-90 transition-all disabled:opacity-50",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

BaseButton.displayName = "BaseButton";

export default BaseButton;
