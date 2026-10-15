import { BoardsData } from "@/types";
import { instance } from "./instance";

export const getAllBoards = (workspaceId: number) =>
  instance.get<BoardsData[]>(`/api/workspaces/${workspaceId}/boards`);

export const patchBoard = (boardId: string, board: BoardsData) =>
  instance.patch<BoardsData>(`/api/boards/${boardId}`, board);

export const getBoard = (boardId: string) =>
  instance.get<BoardsData>(`/api/boards/${boardId}`);
