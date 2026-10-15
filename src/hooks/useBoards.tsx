import { getAllBoards } from "@/api/boards";
import { useQuery } from "@tanstack/react-query";

const useBoards = (workspaceId: number | undefined) =>
  useQuery({
    queryKey: ["boards", workspaceId],
    queryFn: async () => {
      const res = await getAllBoards(workspaceId!);
      return res.data;
    },
    enabled: Boolean(workspaceId),
    staleTime: 60_000,
  });

export default useBoards;
