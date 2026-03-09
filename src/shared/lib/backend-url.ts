import { devWarn } from "@/shared/utils";

const DEFAULT_BACKEND_URL = "http://localhost:4000";
const LOCAL_BACKEND_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

const normalizeBackendUrl = (
  value: string | null | undefined,
): URL | null => {
  const candidate = value?.trim();
  if (!candidate) {
    return null;
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const getValidatedBackendUrl = (): URL => {
  const envUrl = normalizeBackendUrl(import.meta.env.VITE_BACKEND_URL);
  const fallbackUrl = new URL(DEFAULT_BACKEND_URL);
  const selected = envUrl ?? fallbackUrl;

  if (!envUrl && import.meta.env.VITE_BACKEND_URL) {
    devWarn(
      "[security] Invalid VITE_BACKEND_URL detected. Falling back to localhost backend URL.",
    );
  }

  const isLocalHost = LOCAL_BACKEND_HOSTNAMES.has(selected.hostname);

  if (!isLocalHost && selected.protocol !== "https:") {
    devWarn(
      "[security] Non-local backend URL should use HTTPS. Falling back to localhost backend URL.",
    );
    return fallbackUrl;
  }

  return selected;
};

export const getBackendHttpUrl = (): string => getValidatedBackendUrl().origin;

export const getBackendWebSocketUrl = (): string => {
  const backendUrl = getValidatedBackendUrl();
  const protocol = backendUrl.protocol === "https:" ? "wss:" : "ws:";

  return `${protocol}//${backendUrl.host}`;
};
