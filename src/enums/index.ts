export const ROLES = {
  ANALYST: "analyst",
  VIEWER: "viewer",
  ADMIN: "admin",
} as const;

export type ERoles = (typeof ROLES)[keyof typeof ROLES];

export const INDUSTRIES = {
  FINTECH: "fintech",
  safeParseAsync: "saas",
  ECOMMERCE: "ecommerce",
  CRYPTO: "crypto",
  HEALTHCARE: "healthcare",
  OTHER: "other",
} as const;

export type EIndustries = (typeof INDUSTRIES)[keyof typeof INDUSTRIES];

export const SOURCE = {
  YAHOO: "yahoo",
  BYBIT: "bybit",
} as const;

export type ESource = (typeof SOURCE)[keyof typeof SOURCE];

export const RANGE = {
  HOUR: "1h",
  FOUR_HOURS: "4h",
  DAY: "1d",
  FIVE_DAYS: "5d",
  WEEK: "1w",
  MONTH: "1mo",
  THREE_MONTH: "3mo",
  SIX_MONTH: "6mo",
  YEAR: "1y",
  TWO_YEARS: "2y",
  FIVE_YERAS: "5y",
  MAX: "max",
} as const;

export type ERange = (typeof RANGE)[keyof typeof RANGE];

export const INTERVAL = {
  MINUTE: "1m",
  THREE_MINUTES: "3m",
  FIVE_MINUTES: "5m",
  FIFTEEN_MINUTES: "15m",
  HALF_HOUR: "30m",
  HOUR: "1h",
  TWO_HOURS: "2h",
  FOUR_HOURS: "4h",
  SIX_HOURS: "6h",
  EIGHT_HOURS: "8h",
  HALF_DAY: "12h",
  DAY: "1d",
  THREE_DAYS: "3d",
  FIVE_DAYS: "5d",
  WEEK: "1w",
  MONTH: "1M",
} as const;

export type EInterval = (typeof INTERVAL)[keyof typeof INTERVAL];

export const BOARD_COMPONENTS = {
  STOCK_LIST: "Stock list",
  CHART: "Chart"
} as const;

export type EBoardComponents = (typeof BOARD_COMPONENTS)[keyof typeof BOARD_COMPONENTS];
