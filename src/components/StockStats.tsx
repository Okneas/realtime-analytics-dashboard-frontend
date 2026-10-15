"use client";

import { Candle, TickerData } from "@/types";
import { formatCompact, formatPrice } from "@/utils";
import { cn } from "cn";

interface Props {
  tickerData: TickerData;
  candles: Candle[];
  className?: string;
}

interface StatProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export const Stat = ({ label, value, valueClassName }: StatProps) => (
  <div className="flex flex-col gap-0.5 min-w-0">
    <span className="text-regular-small text-primary-gray">{label}</span>
    <span
      className={cn(
        "text-regular font-semibold text-primary-dark font-mono tabular-nums truncate",
        valueClassName,
      )}
    >
      {value}
    </span>
  </div>
);

const StockStats = ({ tickerData, candles, className }: Props) => {
  if (!candles.length) return null;

  const periodHigh = Math.max(...candles.map((c) => c.high));
  const periodLow = Math.min(...candles.map((c) => c.low));
  const periodVolume = candles.reduce((sum, c) => sum + c.volume, 0);
  const avgVolume = periodVolume / candles.length;

  const lastCandle = candles[candles.length - 1];
  const firstCandle = candles[0];
  const periodChange = lastCandle.close - firstCandle.open;
  const periodChangePct = (periodChange / firstCandle.open) * 100;

  const marketState = tickerData.market_state;
  const showMarketState = tickerData.source === "yahoo" && marketState;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Open" value={`$${formatPrice(lastCandle.open)}`} />
        <Stat label="Close" value={`$${formatPrice(lastCandle.close)}`} />
        <Stat
          label="Period Δ"
          value={`${periodChange >= 0 ? "+" : ""}${formatPrice(periodChange)}`}
          valueClassName={
            periodChange >= 0
              ? "text-primary-positive"
              : "text-primary-negative"
          }
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat
          label="Period %"
          value={`${periodChangePct >= 0 ? "+" : ""}${periodChangePct.toFixed(2)}%`}
          valueClassName={
            periodChangePct >= 0
              ? "text-primary-positive"
              : "text-primary-negative"
          }
        />
        <Stat label="Avg Vol" value={formatCompact(avgVolume)} />
        <Stat label="Total Vol" value={formatCompact(periodVolume)} />
      </div>

      <div className="flex items-center justify-between gap-4 text-regular-small">
        <div className="flex items-center gap-3">
          <span className="text-primary-gray">
            Period High{" "}
            <span className="text-primary-dark font-mono tabular-nums">
              ${formatPrice(periodHigh)}
            </span>
          </span>
          <span className="text-primary-gray">
            Period Low{" "}
            <span className="text-primary-dark font-mono tabular-nums">
              ${formatPrice(periodLow)}
            </span>
          </span>
        </div>

        {showMarketState && (
          <span
            className={cn(
              "px-2 py-0.5 rounded-md text-regular-small font-semibold",
              marketState === "REGULAR" &&
                "bg-primary-positive/10 text-primary-positive",
              marketState === "CLOSED" &&
                "bg-primary-gray/10 text-primary-gray",
              !["REGULAR", "CLOSED"].includes(marketState) &&
                "bg-secondary-yellow/20 text-secondary-purple",
            )}
          >
            {marketState}
          </span>
        )}
      </div>
    </div>
  );
};

export default StockStats;
