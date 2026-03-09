import { QueryClient } from "@tanstack/react-query";

type ApiLikeError = {
  statusCode?: number;
};

const isApiLikeError = (error: unknown): error is ApiLikeError =>
  typeof error === "object" && error !== null && "statusCode" in error;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (isApiLikeError(error)) {
          const statusCode = error.statusCode;
          if (
            statusCode === 400 ||
            statusCode === 401 ||
            statusCode === 403 ||
            statusCode === 404 ||
            statusCode === 429
          ) {
            return false;
          }
        }

        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});
