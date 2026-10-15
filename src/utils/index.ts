export const formatCompact = (value: number): string => {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + "B";
  if (abs >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
  if (abs >= 1_000) return (value / 1_000).toFixed(2) + "K";
  return value.toFixed(2);
};

export const formatPrice = (value: number): string => {
  if (!Number.isFinite(value)) return "—";
  if (value >= 1000) return value.toFixed(2);
  if (value >= 1) return value.toFixed(3);
  return value.toFixed(5);
};