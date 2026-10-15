import { instance } from "./instance";
import { ESource } from "@/enums";
import { SearchResponse } from "@/types";

export const searchSymbols = (query: string, source: ESource, limit = 10) =>
  instance.get<SearchResponse>("/api/search", {
    params: { q: query, source, limit },
  });