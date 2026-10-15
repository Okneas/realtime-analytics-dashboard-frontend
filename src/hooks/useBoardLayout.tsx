import { getBoard } from "@/api/boards";
import { useQuery } from "@tanstack/react-query";

const useBoardLayout = (boardId: string) => {
  return useQuery({
    queryKey: ["boardlayout", boardId],
    queryFn: async () => {
        const res = await getBoard(boardId);
        return res.data
    },
    staleTime: 60_000,
    enabled: Boolean(boardId),
    refetchOnWindowFocus: false
  });
};

export default useBoardLayout;
