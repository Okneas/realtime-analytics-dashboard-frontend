import { EBoardComponents, EInterval, ERange, ESource } from "@/enums";
import { LoginDataSchema, RegisterDataSchema } from "@/schemas";
import { Layout } from "react-grid-layout";
import z from "zod";

export type LoginData = z.infer<typeof LoginDataSchema>;

export type RegisterData = z.infer<typeof RegisterDataSchema>;

export type CandleGetParams = {
  symbol: string;
  source: ESource;
  interval: EInterval;
  range: ERange;
};

export type Candle = {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
  volume: number;
};

export type CandlesRes = {
  candles: Candle[];
  interval: EInterval;
  source: ESource;
  symbol: string;
};

export type TickerData = {
  symbol: string;
  source: ESource;
  short_name: string;
  long_name: string;
  currency: string;
  exchange: string;
  asset_type: string;
  market_state: string;
  is_trading: boolean;
  last_price: number;
  prev_close: number;
  change: number;
  change_percent: number;
  day_high: number;
  day_low: number;
  volume_24h: number;
};

export type WebsocketMessage<T> = {
  data: T;
  type: string;
};

export type WebsocketCandleTick = {
  change: number;
  change_percent: number;
  price: number;
  source: string;
  symbol: string;
  timestamp: number;
  volume: number;
};

export type User = {
  email: string;
  full_name: string;
  id: number;
  is_active: boolean;
  created_at: string;
};

export type Workspace = {
  name: string;
  id: number;
  user_id: number;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type SymbolData = {
  label: string;
  value: string;
  source: string;
};

export type StocksListConfig = {
  symbols: SymbolData[];
};

export type StockChartConfig = {
  symbol: SymbolData[]
}

export type BoardComponentConfig = StocksListConfig | StockChartConfig;

export type BoardComponent = {
  type: EBoardComponents;
  config: BoardComponentConfig;
  h: number;
  i: string;
  w: number;
  x: number;
  y: number;
  name: string;
  id?: number;
  workspace_id?: number;
  created_at?: string;
  updated_at?: string;
};

export type BoardsData = {
  name: string;
  layout: {
    components: Array<BoardComponent>;
  };
  id: number;
  workspace_id: number;
  created_at: string;
  updated_at: string;
};

export type SearchResponseResult = {
  symbol: string;
  name: string;
  source: string;
  asset_type: string;
  exchange: string;
  currency: string;
};

export type SearchResponse = {
  query: string;
  results: SearchResponseResult[];
};
