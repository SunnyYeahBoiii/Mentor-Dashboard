import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:21389";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
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

const getErrorCode = (error: AxiosError): string | undefined => {
  const data = error.response?.data;
  if (data && typeof data === "object" && "code" in data) {
    return String((data as { code?: unknown }).code);
  }
  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof (data as { message?: unknown }).message === "object"
  ) {
    const message = (data as { message?: { code?: unknown } }).message;
    return message?.code ? String(message.code) : undefined;
  }
  return undefined;
};

const refresh = async (): Promise<void> => {
  try {
    await api.post("/meet/refresh");
  } catch {
    throw new Error("Token refresh failed");
  }
};

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const errorCode = getErrorCode(error);

    if (
      status === 401 &&
      errorCode === "TOKEN_EXPIRED" &&
      originalRequest &&
      !originalRequest._retry &&
      shouldAttemptRefresh(originalRequest)
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        void refresh()
          .then(() => {
            processQueue(null);
          })
          .catch((err) => {
            processQueue(err as Error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(api(originalRequest)),
          reject: (err) => reject(err || error),
        });
      });
    }

    if (typeof window !== "undefined" && status === 401) {
      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

export { api };
