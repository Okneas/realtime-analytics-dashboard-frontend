import { cn } from "cn";
import { ComponentProps, ReactNode } from "react";

interface Props {
  outline?: boolean;
  resting?: boolean;
  icon?: ReactNode;
}

const   Button = ({
  outline = false,
  resting = false,
  disabled = false,
  children,
  className,
  icon,
  ...props
}: ComponentProps<"button"> & Props) => {
  return (
    <button
      className={cn(
        className,
        "flex-1 p-5 transition-all duration-200 rounded-lg flex gap-2.5 text-button-label-1! justify-center cursor-pointer",
        outline
          ? disabled
            ? "bg-none outline outline-outline text-outline cursor-default pointer-events-none"
            : "bg-none outline outline-primary text-primary"
          : resting
            ? "bg-primary-resting text-primary hover:bg-button-hover text-button-label-1 hover:text-white"
            : disabled
              ? "text-primary-gray bg-background cursor-default pointer-events-none"
              : "bg-primary hover:bg-button-hover text-white",
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
