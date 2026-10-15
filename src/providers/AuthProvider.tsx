"use client";

import { LoginData, RegisterData, User, Workspace } from "@/types";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  me,
} from "@/api/auth";
import { useRouter } from "next/navigation";
import { instance } from "@/api/instance";

interface IAuthContext {
  isAuth: boolean;
  isLoading: boolean;
  user: User | null;
  workspace: Workspace | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuth = user !== null;
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    me()
      .then((res) => {
        setUser(res.data.user);
        setWorkspace(res.data.workspaces[0]);
      })
      .catch(() => {
        router.push("/login")
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  const login = useCallback(
    async (loginData: LoginData) => {
      const res = await loginApi(loginData);
      setUser(res.data.user);
      const workspacesRes = await instance.get("/api/workspaces");
      const firstWorkspace = workspacesRes.data[0] ?? null;
      setWorkspace(firstWorkspace);

      if (firstWorkspace) {
        router.push(`/dashboard/${firstWorkspace.slug}`);
      } else {
        router.push("/dashboard");
      }
    },
    [router],
  );
  const register = useCallback(
    async (registerData: RegisterData) => {
      try {
        const res = await registerApi(registerData);
        setUser(res.data.user);
        setWorkspace(res.data.workspace);
        router.push(`/dashboard/${res.data.workspace.slug}`);
      } catch {
        console.log("register failed");
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      console.log("logout failed");
    } finally {
      setUser(null);
      setWorkspace(null);
      router.push("/login");
    }
  }, [router]);

  const value = useMemo(
    () => ({
      isAuth,
      isLoading,
      login,
      register,
      logout,
      user,
      workspace,
    }),
    [isAuth, isLoading, user, workspace, login, logout, register],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
