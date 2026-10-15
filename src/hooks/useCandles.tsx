import { getCandles } from "@/api/candles";
import { EInterval, ERange, ESource } from "@/enums";
import { useQuery } from "@tanstack/react-query";

const useCandles = (
  symbol: string,
  source: ESource,
  interval: EInterval,
  range: ERange,
) => {
  return useQuery({
    queryKey: ["candles", symbol, source, interval, range],
    queryFn: async () => {
      const resCandles = await getCandles({
        symbol: symbol,
        source: source,
        range: range,
        interval: interval,
      });
      return resCandles.data;
    },
    enabled: Boolean(symbol),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};

export default useCandles;
