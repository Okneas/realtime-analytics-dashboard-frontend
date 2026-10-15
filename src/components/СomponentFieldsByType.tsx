"use client";

import { Controller, useFormContext } from "react-hook-form";
import { MultipleSelector } from "@/components/MultipleSelectorProps";
import TextField from "@/components/TextField";
import { useSymbolSearch } from "@/hooks/useSymbolSearch";

const ComponentFieldsByType = ({
  componentType,
}: {
  componentType: string;
}) => {
  const { register, control } = useFormContext();
  const onSearch = useSymbolSearch();

  switch (componentType) {
    case "Stock list":
      return (
        <>
          <TextField {...register("name")} placeholder="List name" />
          <Controller
            name="symbols"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <MultipleSelector
                value={field.value ?? []}
                onChange={field.onChange}
                onSearch={onSearch}
                placeholder="Search symbol (min 2 chars)..."
                emptyIndicator="Type at least 2 characters"
                loadingIndicator="Searching..."
                delay={300}
              />
            )}
          />
        </>
      );

    case "Chart":
      return (
        <Controller
          name="symbol"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <MultipleSelector
              value={field.value ?? []}
              onChange={field.onChange}
              onSearch={onSearch}
              placeholder="Search symbol (min 2 chars)..."
              emptyIndicator="Type at least 2 characters"
              loadingIndicator="Searching..."
              delay={300}
              maxSelected={1}
            />
          )}
        />
      );

    default:
      return null;
  }
};

export default ComponentFieldsByType;
