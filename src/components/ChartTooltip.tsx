"use client";

import { Candle } from "@/types";

interface Props {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: Candle;
  }>;
  formatTime?: (t: number) => string;
}

const defaultFormatTime = (t: number) =>
  new Date(t).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export const ChartTooltip = ({
  active,
  payload,
  formatTime = defaultFormatTime,
}: Props) => {
  if (!active || !payload?.length) return null;

  const candle = payload[0].payload as Candle;
  const close = payload[0].value as number;

  return (
    <div
      className="
        rounded-lg border border-outline bg-background-white
        px-3 py-2 shadow-md
        flex flex-col gap-1
        pointer-events-none
      "
    >
      <span className="text-regular-small text-primary-gray">
        {formatTime(candle.time)}
      </span>

      <div className="flex items-baseline gap-2">
        <span className="text-regular-small text-primary-gray">Close</span>
        <span className="text-regular font-semibold text-primary-dark font-mono tabular-nums">
          ${close.toFixed(2)}
        </span>
      </div>

      <div className="flex gap-3 text-regular-small tabular-nums">
        <span className="text-primary-gray">
          O <span className="text-primary-dark font-medium">{candle.open.toFixed(2)}</span>
        </span>
        <span className="text-primary-gray">
          H <span className="text-primary-positive font-medium">{candle.high.toFixed(2)}</span>
        </span>
        <span className="text-primary-gray">
          L <span className="text-primary-negative font-medium">{candle.low.toFixed(2)}</span>
        </span>
      </div>
    </div>
  );
};