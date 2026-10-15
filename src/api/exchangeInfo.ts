import { ESource } from "@/enums";
import { instance } from "./instance";
import { TickerData } from "@/types";

export const getTickerData = (symbol: string, source: ESource) =>
  instance.get<TickerData>(`/api/instruments/${symbol}`, { params: { source } });
