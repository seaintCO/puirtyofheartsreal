import "server-only";
import { NextResponse } from "next/server";

function normalizeOrigin(value: string | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

/**
 * Browser-authenticated mutations must originate from this application.
 * Requests without browser origin metadata are allowed so verified webhooks,
 * server-to-server calls, and local tooling continue to work.
 */
export function hasTrustedRequestOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) {
    return false;
  }

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowedOrigins = new Set<string>();
  allowedOrigins.add(new URL(request.url).origin);

  const configuredOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (configuredOrigin) allowedOrigins.add(configuredOrigin);

  return allowedOrigins.has(origin);
}

export function rejectUntrustedOrigin(request: Request) {
  if (hasTrustedRequestOrigin(request)) return null;

  return NextResponse.json(
    { error: "This request was blocked for security." },
    {
      status: 403,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

/**
 * Use the configured public URL for payment redirects when available. Falling
 * back to the current request origin keeps local development functional.
 */
export function getTrustedSiteUrl(request: Request) {
  const configuredOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  return configuredOrigin ?? new URL(request.url).origin;
}
