"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { searchSymbols } from "@/api/search";
import type { Option } from "@/components/MultipleSelectorProps";
import { SOURCE } from "@/enums";

const MIN_QUERY_LENGTH = 2;

const fetchBothSources = async (query: string): Promise<Option[]> => {
  const [crypto, stocks] = await Promise.allSettled([
    searchSymbols(query, SOURCE.BYBIT, 8),
    searchSymbols(query, SOURCE.YAHOO, 8),
  ]);

  const options: Option[] = [];
  const seen = new Set<string>();

  const push = (item: { symbol: string; name: string; source: string }) => {
    const key = `${item.source}:${item.symbol}`;
    if (seen.has(key)) return;
    seen.add(key);

    options.push({
      value: item.symbol,
      label: `${item.symbol} · ${item.name}`,
      source: item.source,
    });
  };

  if (crypto.status === "fulfilled") {
    crypto.value.data.results.forEach(push);
  }

  if (stocks.status === "fulfilled") {
    stocks.value.data.results.forEach(push);
  }

  return options;
};

export const useSymbolSearch = () => {
  const queryClient = useQueryClient();

  const onSearch = useCallback(
    async (rawQuery: string): Promise<Option[]> => {
      const query = rawQuery.trim().toLowerCase();
      if (query.length < MIN_QUERY_LENGTH) return [];

      return queryClient.fetchQuery({
        queryKey: ["symbol-search", query],
        queryFn: () => fetchBothSources(query),
        staleTime: 5 * 60_000,
        gcTime: 10 * 60_000,
      });
    },
    [queryClient],
  );

  return onSearch;
};