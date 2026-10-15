"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "cn";

export interface Option {
  value: string;
  label: string;
  source?: string;
  disable?: boolean;
  fixed?: boolean;
}

interface MultipleSelectorProps {
  value?: Option[];
  onChange?: (options: Option[]) => void;
  options?: Option[];
  placeholder?: string;
  loadingIndicator?: React.ReactNode;
  emptyIndicator?: React.ReactNode;
  onSearch?: (value: string) => Promise<Option[]>;
  delay?: number;
  triggerSearchOnFocus?: boolean;
  maxSelected?: number;
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  className?: string;
  badgeClassName?: string;
}

function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export const MultipleSelector = React.forwardRef<
  HTMLDivElement,
  MultipleSelectorProps
>(
  (
    {
      value,
      onChange,
      options,
      placeholder = "Select...",
      loadingIndicator = "Loading...",
      emptyIndicator = "No results",
      onSearch,
      delay = 500,
      triggerSearchOnFocus = false,
      maxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      className,
      badgeClassName,
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [fetched, setFetched] = React.useState<Option[]>([]);

    const selected = value ?? [];
    const debouncedSearch = useDebounce(inputValue, delay);

    React.useEffect(() => {
      if (!onSearch) return;
      if (!debouncedSearch && !triggerSearchOnFocus) return;

      let cancelled = false;

      queueMicrotask(() => {
        if (!cancelled) setLoading(true);
      });

      onSearch(debouncedSearch)
        .then((res) => {
          if (!cancelled) setFetched(res);
        })
        .catch(() => {
          if (!cancelled) setFetched([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });

      return () => {
        cancelled = true;
      };
    }, [debouncedSearch, onSearch, triggerSearchOnFocus]);

    const sourceOptions = React.useMemo(
      () => (onSearch ? fetched : (options ?? [])),
      [onSearch, fetched, options],
    );

    const filtered = React.useMemo(() => {
      if (onSearch) return sourceOptions;
      if (!inputValue) return sourceOptions;
      const lower = inputValue.toLowerCase();
      return sourceOptions.filter((o) => o.label.toLowerCase().includes(lower));
    }, [sourceOptions, inputValue, onSearch]);

    const handleSelect = (option: Option) => {
      if (maxSelected && selected.length >= maxSelected) return;
      if (selected.some((s) => s.value === option.value)) return;

      onChange?.([...selected, option]);
      setInputValue("");
      inputRef.current?.focus();
    };

    const handleRemove = (option: Option) => {
      if (option.fixed) return;
      onChange?.(selected.filter((s) => s.value !== option.value));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !inputValue && selected.length > 0) {
        handleRemove(selected[selected.length - 1]);
      }
    };

    const isSelected = (o: Option) => selected.some((s) => s.value === o.value);

    return (
      <PopoverPrimitive.Root modal open={open} onOpenChange={setOpen}>
        <CommandPrimitive
          shouldFilter={false}
          className="overflow-visible bg-transparent z-100"
        >
          <PopoverPrimitive.Anchor asChild>
            <div
              ref={ref}
              className={cn(
                "flex flex-wrap gap-1.5 min-h-11 w-full rounded-lg px-3 py-2",
                "bg-background-white border border-outline",
                "cursor-text",
                disabled && "opacity-50 cursor-not-allowed",
                className,
              )}
              onClick={() => !disabled && inputRef.current?.focus()}
            >
              {selected.map((option) => (
                <span
                  key={option.value}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-md",
                    "bg-primary-resting text-primary text-regular-small font-semibold",
                    badgeClassName,
                  )}
                >
                  {option.label}
                  {!option.fixed && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(option);
                      }}
                      className="cursor-pointer hover:opacity-70"
                    >
                      <X className="size-3" />
                    </button>
                  )}
                </span>
              ))}

              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={(v) => {
                  setInputValue(v);
                  if (!open) setOpen(true);
                }}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder={
                  selected.length === 0 || !hidePlaceholderWhenSelected
                    ? placeholder
                    : undefined
                }
                className={cn(
                  "flex-1 min-w-20 outline-none bg-transparent",
                  "text-regular text-primary-dark placeholder:text-primary-gray",
                )}
                onFocus={() => setOpen(true)}
              />
            </div>
          </PopoverPrimitive.Anchor>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={4}
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => e.preventDefault()}
              className={cn(
                "pointer-events-auto z-[100] w-(--radix-popover-trigger-width)",
                "bg-background-white rounded-lg shadow-lg border border-outline",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
              )}
            >
              <CommandPrimitive.List className="max-h-64 overflow-y-auto p-1">
                {loading && (
                  <div className="py-6 text-center text-regular text-primary-gray">
                    {loadingIndicator}
                  </div>
                )}

                {!loading && filtered.length === 0 && (
                  <div className="py-6 text-center text-regular text-primary-gray">
                    {emptyIndicator}
                  </div>
                )}

                {!loading &&
                  filtered.map((option) => (
                    <CommandPrimitive.Item
                      key={option.value}
                      value={option.label}
                      onMouseDown={(e) => e.preventDefault()}
                      disabled={option.disable || isSelected(option)}
                      onSelect={() => handleSelect(option)}
                      className={cn(
                        "relative flex items-center gap-2 px-3 py-2 rounded-md",
                        "text-regular cursor-pointer select-none outline-none",
                        "data-[selected=true]:bg-background-light data-[selected=true]:text-primary",
                        "data-[disabled=true]:opacity-40 data-[disabled=true]:cursor-not-allowed",
                        isSelected(option) && "text-primary-gray",
                      )}
                    >
                      {option.label}
                    </CommandPrimitive.Item>
                  ))}
              </CommandPrimitive.List>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </CommandPrimitive>
      </PopoverPrimitive.Root>
    );
  },
);

MultipleSelector.displayName = "MultipleSelector";
