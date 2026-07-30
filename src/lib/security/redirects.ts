const FALLBACK_ORIGIN = "https://purity-of-hearts.local";

/**
 * Accept only an internal application path. This blocks protocol-relative URLs,
 * backslash-based browser normalization, control characters, and external URLs.
 */
export function safeInternalPath(
  value: string | null | undefined,
  fallback: string,
) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return fallback;
  }

  try {
    const parsed = new URL(value, FALLBACK_ORIGIN);
    if (parsed.origin !== FALLBACK_ORIGIN) return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}
