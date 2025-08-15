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
          "p-4 h-[40px] bg-[var(--color-primary)] flex justify-center items-center text-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-[var(--color-primary-hover)]",
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
