"use client";

import { ComponentProps, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "cn";

interface Props {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

const TextField = ({
  label,
  icon,
  error,
  type,
  className,
  ...props
}: ComponentProps<"input"> & Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full flex flex-col gap-1">
      {label && <span className="text-regular text-primary-gray">{label}</span>}

      <div
        className={cn(
          "pb-2 w-full border-b flex gap-4 items-center",
          error ? "border-secondary-red" : "border-[#ECECF2]",
        )}
      >
        {icon && <span className="text-primary-gray shrink-0">{icon}</span>}

        <input
          {...props}
          type={resolvedType}
          className={cn(
            "flex-1 font-bold text-regular border-0 outline-0 bg-transparent",
            className,
          )}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="shrink-0 text-primary-gray cursor-pointer hover:text-primary transition-colors"
          >
            {showPassword ? (
              <EyeOff className="size-4.5" />
            ) : (
              <Eye className="size-4.5" />
            )}
          </button>
        )}
      </div>

      <span
        className={cn(
          "text-xs leading-4 min-h-4 transition-opacity",
          error ? "text-red-500 opacity-100" : "opacity-0",
        )}
      >
        {error || " "}
      </span>
    </div>
  );
};

export default TextField;