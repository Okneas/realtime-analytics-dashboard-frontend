import { ESource } from "@/enums";
import useCandles from "@/hooks/useCandles";
import useTickerData from "@/hooks/useTickerData";
import useWebsocket from "@/hooks/useWebsocket";
import { WebsocketCandleTick, WebsocketMessage } from "@/types";
import { cn } from "cn";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";
import Skeleton from "./Skeleton";

interface Props {
  symbol: string;
  source: ESource;
}

const StocksMiniCard = ({
  symbol,
  source, 
  className,
  ...props
}: ComponentProps<"div"> & Props) => {
  const { data: tickerData, isLoading: isTickerLoading } = useTickerData(symbol, source);
  const { data: candlesData, isLoading: isCandleLoading } = useCandles(symbol, source, "1h", "1d");
  const [currentValue, setCurrentValue] = useState(tickerData?.last_price);
  const [changeValue, setChangeValue] = useState(tickerData?.change);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prevRef = useRef(currentValue);

  const handleSocketMessage = (msg: WebsocketMessage<WebsocketCandleTick>) => {
    setCurrentValue(msg.data.price);
    setChangeValue(msg.data.change);
  };

  const ws = useWebsocket(symbol, handleSocketMessage);

  useEffect(() => {
    if (currentValue === undefined) return;
    if (prevRef.current === undefined) {
      prevRef.current = currentValue;
      return;
    }

    if (currentValue === prevRef.current) return;

    setFlash(currentValue > prevRef.current ? "up" : "down");
    prevRef.current = currentValue;

    const t = setTimeout(() => setFlash(null), 300);
    return () => clearTimeout(t);
  }, [currentValue]);


  if(isTickerLoading || isCandleLoading) {
    return(
      <div
      {...props}
      className={cn(
        "h-full w-full rounded-lg aspect-[1.8] flex flex-col justify-between p-4",
        className,
      )}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2 w-[40%]">
          <Skeleton className="h-5 w-full rounded-2xl" />
          <Skeleton className="h-5 w-full rounded-2xl" />
        </div>
        <div className="flex flex-col gap-2 w-[40%]">
          <Skeleton className="h-5 w-full rounded-2xl" />
          <Skeleton className="h-5 w-full rounded-2xl" />
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2 w-[40%]">
          <Skeleton className="h-5 w-full rounded-2xl" />
          <Skeleton className="h-5 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-12 w-[40%] rounded-2xl" />
      </div>
    </div>
    )
  }

  return (
    <div
      {...props}
      className={cn(
        "h-full w-full rounded-lg aspect-[1.8] flex flex-col justify-between p-4",
        className,
      )}
    >
      {tickerData && candlesData?.candles && (
        <>
          <div className="w-full flex justify-between">
            <span className="text-h4 text-white font-semibold">
              {tickerData.long_name}
            </span>
            <div className="flex flex-col">
              <span className="text-regular text-white text-right">
                {tickerData.symbol}
              </span>
              {changeValue && (
                <span
                  className={cn(
                    "text-regular text-right",
                    changeValue > 0
                      ? "text-primary-positive"
                      : "text-primary-negative",
                  )}
                >
                  {changeValue > 0
                    ? "+" + changeValue.toFixed(2)
                    : changeValue.toFixed(3)}
                  $
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-col">
              <span className="text-regular text-white">Current value</span>
              <span
                className={cn(
                  "text-h4! text-white font-bold transition-colors duration-300",
                  flash === "up" && "text-primary-positive",
                  flash === "down" && "text-primary-negative",
                )}
              >
                ${currentValue}
              </span>
            </div>
            <ResponsiveContainer width="50%">
              <AreaChart data={candlesData.candles}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#77B900" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#77B900" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis hide className="opacity-0" domain={["auto", "auto"]} />
                <Area
                  type="monotone"
                  dataKey="close"
                  stroke="#6C8C3C"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                  dot={false}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default StocksMiniCard;
