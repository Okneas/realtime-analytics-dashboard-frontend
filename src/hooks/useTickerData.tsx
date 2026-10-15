import { getTickerData } from "@/api/exchangeInfo";
import { ESource } from "@/enums";
import { useQuery } from '@tanstack/react-query';

const useTickerData = (symbol: string, source: ESource) => {
    return useQuery({
        queryKey: ['tickerData', symbol, source],
        queryFn: async () => {
            const res = await getTickerData(symbol, source)
            return res.data
        },
        enabled: Boolean(symbol),
        staleTime: 60_000,
        refetchOnWindowFocus: false,
    })
}

export default useTickerData;