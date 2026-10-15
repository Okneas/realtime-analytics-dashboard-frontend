"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "cn";

type DialogSize = "sm" | "md" | "lg";

interface DialogProps {
  trigger: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const SIZE_CLASSES: Record<DialogSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

const Dialog = ({
  trigger,
  title,
  description,
  children,
  footer,
  size = "md",
  open,
  onOpenChange,
  className,
}: DialogProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/50",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />

        <DialogPrimitive.Content
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement;
            if (
              target.closest("[data-radix-popper-content-wrapper]") ||
              target.closest("[cmdk-list]") ||
              target.closest("[cmdk-item]")
            ) {
              e.preventDefault();
            }
          }}
          className={cn(
            "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-[90vw] max-h-[90vh]",
            "bg-background-white rounded-2xl shadow-xl",
            "flex flex-col gap-6 p-6",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            SIZE_CLASSES[size],
            className,
          )}
        >
          <header className="flex flex-col gap-2 pr-8">
            <DialogPrimitive.Title className="text-h3 text-primary-dark">
              {title}
            </DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className="text-regular text-primary-gray">
                {description}
              </DialogPrimitive.Description>
            )}
          </header>

          <DialogPrimitive.Close
            aria-label="Close"
            className={cn(
              "absolute top-4 right-4 p-2 rounded-lg cursor-pointer",
              "text-primary-gray hover:bg-background-light hover:text-primary-dark",
              "transition-colors",
            )}
          >
            <X className="size-5" />
          </DialogPrimitive.Close>

          {children && (
            <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
          )}

          {footer && (
            <footer className="flex justify-end gap-3">{footer}</footer>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
