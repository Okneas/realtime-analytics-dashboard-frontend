"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { ReactNode, forwardRef } from "react";
import { cn } from "cn";

interface Props {
  optionsEnum: string[];
  label?: string;
  icon?: ReactNode;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

const Select = forwardRef<HTMLButtonElement, Props>(
  (
    {
      optionsEnum,
      label,
      icon,
      error = false,
      placeholder = "Select an option",
      value,
      onChange,
      onBlur,
      name,
      disabled,
      className,
    },
    ref,
  ) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <span className="text-regular text-primary-gray">{label}</span>
        )}

        <RadixSelect.Root
          value={value}
          onValueChange={onChange}
          name={name}
          disabled={disabled}
        >
          <div
            className={cn(
              "pb-2 w-full border-b flex gap-4 items-center",
              error ? "border-secondary-red" : "border-[#ECECF2]",
            )}
          >
            {icon && <span className="text-primary-gray shrink-0">{icon}</span>}

            <RadixSelect.Trigger
              ref={ref}
              onBlur={onBlur}
              className={cn(
                "flex-1 font-bold text-regular border-0 outline-0 bg-transparent",
                "flex items-center justify-between gap-2",
                "data-placeholder:text-primary-gray data-placeholder:font-normal",
                "data-[state=open]:text-primary",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )}
            >
              <RadixSelect.Value placeholder={placeholder} />
              <RadixSelect.Icon>
                <ChevronDown
                  className={cn(
                    "size-4 text-primary-gray transition-transform duration-200",
                    "group-data-[state=open]:rotate-180",
                  )}
                />
              </RadixSelect.Icon>
            </RadixSelect.Trigger>
          </div>

          <RadixSelect.Portal>
            <RadixSelect.Content
              position="popper"
              sideOffset={8}
              className={cn(
                "z-50 min-w-(--radix-select-trigger-width)",
                "bg-background-white rounded-xl shadow-lg border border-outline",
                "overflow-hidden",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                "data-[side=bottom]:slide-in-from-top-2",
                "data-[side=top]:slide-in-from-bottom-2",
              )}
            >
              <RadixSelect.Viewport className="p-1">
                {optionsEnum.map((option) => (
                  <RadixSelect.Item
                    key={option}
                    value={option}
                    className={cn(
                      "relative flex items-center gap-2 px-3 py-2 rounded-lg",
                      "text-regular cursor-pointer select-none outline-none",
                      "data-highlighted:bg-background-light data-highlighted:text-primary",
                      "data-[state=checked]:font-semibold data-[state=checked]:text-primary",
                    )}
                  >
                    <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator className="ml-auto">
                      <Check className="size-4" />
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
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
  },
);

Select.displayName = "Select";

export default Select;
