import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const refreshEndpoint =
  import.meta.env.VITE_REFRESH_ENDPOINT || "/auth/refresh";

type CustomAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

type NormalizedError = {
  status: "error";
  statusCode: number;
  message: string | string[];
};

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const normalizeAxiosError = (error: AxiosError): NormalizedError => {
  if (error.response) {
    const statusCode = error.response.status ?? 0;
    const data = error.response.data;
    let message: string | string[] | undefined;

    if (typeof data === "string" && data.trim()) {
      message = data;
    } else if (data && typeof data === "object") {
      if ("message" in data) {
        const value = (data as { message?: unknown }).message;
        if (typeof value === "string" || Array.isArray(value)) {
          message = value as string | string[];
        }
      } else if ("error" in data) {
        const value = (data as { error?: unknown }).error;
        if (typeof value === "string" || Array.isArray(value)) {
          message = value as string | string[];
        }
      }
    }

    return {
      status: "error",
      statusCode,
      message:
        message ||
        error.response.statusText ||
        `Request failed with status ${statusCode}`,
    };
  }

  let fallback: string | string[] = "Something went wrong";

  if (error.code === "ECONNABORTED") {
    fallback = "Request timed out, please try again";
  } else if (
    typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean" &&
    !navigator.onLine
  ) {
    fallback = "You appear to be offline, please check your connection";
  } else if (error.message === "Network Error") {
    fallback = "Network error, please verify your connection";
  } else if (error.request) {
    fallback = "No response from server, please check your connection";
  } else if (error.message) {
    fallback = error.message;
  }

  return {
    status: "error",
    statusCode: 0,
    message: fallback,
  };
};

let refreshPromise: Promise<void> | null = null;

const refreshAuthToken = async (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post(refreshEndpoint)
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// ===============================
// 🔹 Response Interceptor - Error handling
// ===============================
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | CustomAxiosRequestConfig
      | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await refreshAuthToken();
        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(normalizeAxiosError(refreshError as AxiosError));
      }
    }

    return Promise.reject(normalizeAxiosError(error));
  },
);

export default instance;
