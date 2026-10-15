import axios from "axios"
import { redirect } from "next/navigation";

export const instance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

let isRefreshing = false;
let pendingQueue: Array<(success: boolean) => void> = [];

function flushQueue(success: boolean) {
  pendingQueue.forEach((cb) => cb(success));
  pendingQueue = [];
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;
    const tokenStatus = error.response?.headers["x-token-status"];

    if (
      status !== 401 ||
      original._retry ||
      original.url?.includes("/auth/refresh") ||
      tokenStatus !== "expired"
    ) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((success) => {
          if (success) resolve(instance(original));
          else reject(error);
        });
      });
    }

    isRefreshing = true;
    try {
      await instance.post("/api/auth/refresh");
      flushQueue(true);
      return instance(original);
    } catch (refreshError) {
      flushQueue(false);
      if (typeof window !== "undefined") {
        redirect("/login");
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);


