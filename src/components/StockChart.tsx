"use client";

import { EInterval, ERange, ESource } from "@/enums";
import useCandles from "@/hooks/useCandles";
import useTickerData from "@/hooks/useTickerData";
import { ComponentProps, useState } from "react";
import Skeleton from "./Skeleton";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import StockStats, { Stat } from "./StockStats";
import { formatPrice } from "@/utils";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { GripHorizontal } from "lucide-react";

interface Props {
  symbol: string;
  source: ESource;
}

const toggleGroupItemClasses =
  "cursor-pointer transition-all duration-200 flex py-2 px-4 items-center justify-center bg-primary-resting text-primary first:rounded-l-lg last:rounded-r-lg hover:bg-violet3 focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none data-[state=on]:bg-primary data-[state=on]:text-white";

const StockChart = ({
  symbol,
  source,
  ...props
}: ComponentProps<"div"> & Props) => {
  const [range, setRange] = useState<ERange>("1d");
  const [interval, setInterval] = useState<EInterval>("5m");
  const { data: tickerData, isLoading: isTickerLoading } = useTickerData(
    symbol,
    source,
  );
  const { data: candlesData, isLoading: isCandleLoading } = useCandles(
    symbol,
    source,
    interval,
    range,
  );

  const handleChangeRange = (newState: ERange) => {
    switch (newState) {
      case "1d":
        setInterval("5m");
        break;
      case "1w":
        setInterval("1h");
        break;
      case "1mo":
        setInterval("1d");
        break;
      case "1y":
        setInterval("5d");
        break;
      default:
        return;
    }
    setRange(newState);
  };

  if (isTickerLoading || isCandleLoading || !tickerData || !candlesData) {
    return (
      <div
        {...props}
        className="w-full h-full flex flex-col gap-5 p-5 rounded-lg bg-white"
      >
        <Skeleton className="w-full h-full bg-primary-resting rounded-lg" />
      </div>
    );
  }

  return (
    <div
      {...props}
      className="w-full h-full flex flex-col gap-5 p-5 rounded-lg bg-white"
    >
      <div className="w-full flex justify-center">
        <GripHorizontal className="stroke-primary cursor-grab active:cursor-grabbing" />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-primary text-h2">{tickerData?.long_name}</span>
          <span className="text-secondary-purple text-h4">
            {tickerData?.symbol}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Stat
            label="High"
            value={`$${formatPrice(candlesData.candles[candlesData.candles.length - 1].high)}`}
            valueClassName="text-primary-positive"
          />
          <Stat
            label="Low"
            value={`$${formatPrice(candlesData.candles[candlesData.candles.length - 1].low)}`}
            valueClassName="text-primary-negative"
          />
        </div>
      </div>
      <ToggleGroup
        className="flex rounded-lg justify-end"
        type="single"
        defaultValue={range}
        aria-label="Range selector"
        onValueChange={handleChangeRange}
      >
        <ToggleGroupItem
          value="1d"
          aria-label="Left aligned"
          className={toggleGroupItemClasses}
        >
          <span className="text-inherit text-h4">1d</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value={source === "yahoo" ? "1mo" : "1w"}
          aria-label="Center aligned"
          className={toggleGroupItemClasses}
        >
          <span className="text-inherit text-h4">
            {source === "yahoo" ? "1mo" : "1w"}
          </span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value={source === "yahoo" ? "1y" : "1mo"}
          aria-label="Right aligned"
          className={toggleGroupItemClasses}
        >
          <span className="text-inherit text-h4">
            {source === "yahoo" ? "1y" : "1mo"}
          </span>
        </ToggleGroupItem>
      </ToggleGroup>
      <ResponsiveContainer width="100%">
        <AreaChart data={candlesData.candles}>
          <defs>
            <linearGradient id="colorUv-chart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9698D6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#9698D6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis
            allowDuplicatedCategory
            fontSize={12}
            dataKey="time"
            tickFormatter={(t) =>
              new Date(t).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          />
          <YAxis fontSize={12} domain={["auto", "auto"]} />
          <Tooltip
            content={
              <ChartTooltip
                formatTime={(t) =>
                  new Date(t).toLocaleTimeString("ru-RU", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
              />
            }
            cursor={{ stroke: "#8181A5", strokeDasharray: "4 4" }}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#5E81F4"
            fillOpacity={1}
            fill="url(#colorUv-chart)"
            dot={false}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
      <StockStats
        tickerData={tickerData}
        candles={candlesData.candles}
        className="pt-4 border-t border-outline"
      />
    </div>
  );
};

export default StockChart;
