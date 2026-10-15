import { CandleGetParams, CandlesRes } from "@/types";
import { instance } from "./instance";

export const getCandles = (params: CandleGetParams) =>
  instance.get<CandlesRes>("/api/candles", { params: { ...params } });
