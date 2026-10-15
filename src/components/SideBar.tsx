"use client";

import { Plus } from "lucide-react";
import SelectBoardButton from "./SelectButton";
import { useAuth } from "@/hooks/useAuth";
import useBoards from "@/hooks/useBoards";

const SideBar = () => {
  const { workspace } = useAuth();
  const { data } = useBoards(workspace?.id);

  return (
    <div className="flex flex-1 flex-col h-dvh px-4 gap-7 pb-7 bg-background-white">
      <div className="py-6 h-24 flex items-center">
        <span className="text-h2">CashDash</span>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <span className="text-regular text-primary-gray">Your boards</span>
        {data?.map((board, indx) => {
          return (
            <SelectBoardButton key={"board-list-" + board.id + "-" + indx} board={board}>
              <span>{board.name}</span>
            </SelectBoardButton>
          );
        })}
        <button className="w-full px-5 py-4 rounded-lg flex cursor-pointer justify-center items-center outline-2 outline-dashed outline-primary">
          <Plus className="stroke-primary size-5" />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
