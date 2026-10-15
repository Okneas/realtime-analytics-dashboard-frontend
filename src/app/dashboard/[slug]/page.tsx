"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardSlug = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user === null) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-0 min-w-0 w-full flex-1 flex-col gap-5 overflow-y-auto px-8 py-4">Загрузка...</main>
    );
  }

  if (user === null) {
    return null
  } 

  return (
    <main className="flex flex-1 items-center justify-center text-primary-gray text-h1">
      Select a board in the sidebar
    </main>
  );
};

export default DashboardSlug;
