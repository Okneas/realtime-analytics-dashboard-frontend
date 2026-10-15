"use client";

import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/providers/AuthProvider";

const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then((mod) => ({
    default: mod.ReactQueryDevtools,
  })),
);

function makeQueryClient() {
  console.log("[QC] new QueryClient created");
  return new QueryClient();
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
