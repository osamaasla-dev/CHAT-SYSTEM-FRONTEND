const SAFE_IMAGE_DATA_PREFIX = "data:image/";
const BLOCKED_IMAGE_DATA_PREFIXES = ["data:image/svg+xml"];

const isHttpProtocol = (protocol: string): boolean =>
  protocol === "http:" || protocol === "https:";

export const toSafeHttpUrl = (
  rawUrl: string | null | undefined,
): string | null => {
  const normalized = rawUrl?.trim();
  if (!normalized) {
    return null;
  }

  try {
    const parsed = new URL(normalized, window.location.origin);
    if (!isHttpProtocol(parsed.protocol)) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
};

export const toSafeImageUrl = (
  rawUrl: string | null | undefined,
): string | null => {
  const normalized = rawUrl?.trim();
  if (!normalized) {
    return null;
  }

  if (normalized.startsWith("blob:")) {
    return normalized;
  }

  if (normalized.startsWith("data:")) {
    if (BLOCKED_IMAGE_DATA_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
      return null;
    }

    return normalized.startsWith(SAFE_IMAGE_DATA_PREFIX) ? normalized : null;
  }

  try {
    const parsed = new URL(normalized, window.location.origin);
    return isHttpProtocol(parsed.protocol) ? parsed.toString() : null;
  } catch {
    return null;
  }
};
