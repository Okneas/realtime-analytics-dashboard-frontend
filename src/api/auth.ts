import { LoginData, RegisterData, User, Workspace } from "@/types";
import { instance } from "./instance";

export const login = (loginData: LoginData) =>
  instance.post<{ user: User; workspace: Workspace }>("/api/auth/login", loginData);

export const register = (data: RegisterData) =>
  instance.post<{ user: User; workspace: Workspace }>("/api/auth/register", data);

export const logout = () => instance.post("/api/auth/logout");

export const me = () => instance.get("/api/auth/me");
