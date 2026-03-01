import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<void | null> | null = null;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(undefined);
    }
  });
  failedQueue = [];
};

const isPublicRoute = (pathname: string): boolean => {
  return pathname !== "/current-sessions";
};

const shouldAttemptRefresh = (config?: AxiosRequestConfig): boolean => {
  if (!config?.url) {
    return false;
  }

  const url = config.url.toString();

  // Do not ever try to refresh for the refresh endpoint itself
  if (url.includes("/meet/refresh")) {
    return false;
  }

  return true;
};

const refresh = async (): Promise<void | null> => {
  try {
    await api.post("/meet/refresh");
    return Promise.resolve();
  } catch {
    return Promise.reject(new Error("Token refresh failed"));
  }
};

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("[Axios Interceptor] Response error caught");
    const status = error.response?.status;
    const originalRequest = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;

    console.log("[Axios Interceptor] Error:", status, originalRequest?.url);

    if (
      (status === 401 || status === 500) &&
      originalRequest &&
      !originalRequest._retry &&
      shouldAttemptRefresh(originalRequest)
    ) {
      originalRequest._retry = true;
      console.log("[Axios Interceptor] Attempting token refresh...");

      if (!isRefreshing) {
        isRefreshing = true;
        console.log("[Axios Interceptor] Starting refresh process");
        refreshPromise = refresh()
          .then(() => {
            console.log("[Axios Interceptor] Token refresh succeeded");
            processQueue(null);
          })
          .catch((err) => {
            console.log("[Axios Interceptor] Token refresh failed:", err);
            processQueue(err as Error);
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      } else {
        console.log(
          "[Axios Interceptor] Refresh already in progress, queuing request",
        );
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => {
            console.log(
              "[Axios Interceptor] Retrying request:",
              originalRequest.url,
            );
            resolve(api(originalRequest));
          },
          reject: (err) => reject(err || error),
        });
      });
    }

    if (typeof window !== "undefined" && (status === 401 || status === 500)) {
      const pathname = window.location.pathname;
      if (!isPublicRoute(pathname)) {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export { api };
