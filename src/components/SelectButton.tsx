import { BoardsData } from "@/types";
import { cn } from "cn";
import { useParams, useRouter } from "next/navigation";
import { ComponentProps } from "react";

interface Props {
  board: BoardsData;
}

const SelectBoardButton = ({
  board,
  children,
  ...props
}: ComponentProps<"button"> & Props) => {
  const params = useParams<{ boardId: string; slug: string }>();
  const router = useRouter();

  const handleSelectBoard = () => {
    router.push(`/dashboard/${params.slug}/${board.id}`);
  };

  return (
    <button
      {...props}
      onClick={handleSelectBoard}
      className={cn(
        "w-full px-5 py-4 rounded-lg flex cursor-pointer",
        params.boardId === String(board.id)
          ? "bg-primary-resting text-primary"
          : "bg-outline",
      )}
    >
      {children}
    </button>
  );
};

export default SelectBoardButton;
