import type { ApiErrorResponse } from "@/shared/lib";

const MAX_RETRY_DELAY_MS = 30_000;
const BASE_RETRY_DELAY_MS = 1_000;
const MAX_RETRY_EXPONENT = 5;

type ApiErrorLike = Pick<ApiErrorResponse, "statusCode" | "message">;

const isApiErrorLike = (value: unknown): value is ApiErrorLike => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const errorCandidate = value as Partial<ApiErrorLike>;
  return (
    typeof errorCandidate.statusCode === "number" &&
    (typeof errorCandidate.message === "string" ||
      Array.isArray(errorCandidate.message))
  );
};

export const getApiErrorStatusCode = (error: unknown): number | null => {
  if (!isApiErrorLike(error)) {
    return null;
  }

  return error.statusCode;
};

export const getApiErrorMessage = (error: unknown): string | string[] | null => {
  if (!isApiErrorLike(error)) {
    return null;
  }

  return error.message;
};

export const isTransientOutboxError = (error: unknown): boolean => {
  const statusCode = getApiErrorStatusCode(error);

  if (statusCode === null) {
    return true;
  }

  if (statusCode === 0 || statusCode === 429 || statusCode >= 500) {
    return true;
  }

  return false;
};

export const computeRetryDelayMs = (retryCount: number): number => {
  const boundedExponent = Math.min(Math.max(retryCount, 0), MAX_RETRY_EXPONENT);
  const baseDelay = BASE_RETRY_DELAY_MS * 2 ** boundedExponent;
  const jitter = Math.floor(Math.random() * 400);

  return Math.min(MAX_RETRY_DELAY_MS, baseDelay + jitter);
};
