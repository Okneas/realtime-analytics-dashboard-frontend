"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardRedirect = () => {
  const { user, workspace, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (workspace) {
      router.replace(`/dashboard/${workspace.slug}`);
    }
  }, [isLoading, user, workspace, router]);

  return <main className="...">Загрузка...</main>;
};

export default DashboardRedirect;