import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<void | null> | null = null;

const isPublicRoute = (pathname: string): boolean => {
    return (
        pathname === '/current-sessions/add-session'
    );
};

const shouldAttemptRefresh = (config?: AxiosRequestConfig): boolean => {
    if (!config?.url) {
        return false;
    }

    const url = config.url.toString();

    // Do not ever try to refresh for the refresh endpoint itself
    if (url.includes('/auth/refresh')) {
        return false;
    }

    return true;
};

const refresh = async (): Promise<void | null> => {
    try {
        await api.post('/auth/refresh');
        return;
    } catch {
        return null;
    }
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const originalRequest = error.config as
            | (AxiosRequestConfig & { _retry?: boolean })
            | undefined;

        if (
            (status === 401 || status === 500) &&
            originalRequest &&
            !originalRequest._retry &&
            shouldAttemptRefresh(originalRequest)
        ) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                refreshPromise = refresh();
            }

            const result = await refreshPromise;
            isRefreshing = false;
            refreshPromise = null;

            if (result !== null) {
                return api(originalRequest);
            }
        }

        if (typeof window !== 'undefined' && status === 401) {
            const pathname = window.location.pathname;
            if (!isPublicRoute(pathname)) {
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    },
);

export { api };
