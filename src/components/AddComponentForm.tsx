"use client";

import { BOARD_COMPONENTS } from "@/enums";
import Select from "./Select";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ComponentFieldsByType from "@/components/СomponentFieldsByType";
import Button from "./Button";
import { patchBoard } from "@/api/boards";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useBoardLayout from "@/hooks/useBoardLayout";

interface Props {
  onSuccess?: () => void;
}

const AddComponentForm = ({ onSuccess }: Props) => {
  const methods = useForm({ mode: "onTouched" });
  const type = methods.watch("type");
  const params = useParams<{ slug: string; boardId: string }>();
  const { data: currentBoard } = useBoardLayout(params.boardId);
  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    if (!currentBoard) return;

    if (!currentBoard.layout.components) {
      currentBoard.layout = { components: [] };
    }

    const tempConfig =
      data.type === "Chart"
        ? { symbol: data.symbol }
        : { symbols: data.symbols };

    const maxY = currentBoard.layout.components.reduce(
      (max, c) => Math.max(max, c.y + c.h),
      0,
    );

    const tempLayout = {
      x: 0,
      y: maxY,
      w: data.type === "Chart" ? 4 : 12,
      h: data.type === "Chart" ? 15 : 5,
    };

    const newComponent = {
      type: data.type,
      name: data.name,
      config: tempConfig,
      i: crypto.randomUUID(),
      ...tempLayout,
    };

    const updatedBoard = {
      ...currentBoard,
      layout: {
        ...currentBoard.layout,
        components: [...currentBoard.layout.components, newComponent],
      },
    };

    await patchBoard(params.boardId, updatedBoard);
    await queryClient.invalidateQueries({
      queryKey: ["boardlayout", params.boardId],
    });
    methods.reset();
    onSuccess?.();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <Controller
          name="type"
          control={methods.control}
          defaultValue=""
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              placeholder="Select component type"
              optionsEnum={Object.values(BOARD_COMPONENTS)}
            />
          )}
        />

        <ComponentFieldsByType componentType={type} />
        <div className="w-full flex gap-2">
          <Button type="button" resting>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddComponentForm;
