import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const source = url.searchParams.get("utm_source")?.toLowerCase();

  // Clean ChatGPT tracking parameters from shared/opened links before rendering.
  // Other application query parameters are preserved.
  if (source === "chatgpt.com" || source === "chatgpt") {
    for (const key of Array.from(url.searchParams.keys())) {
      if (key.startsWith("utm_")) url.searchParams.delete(key);
    }
    return NextResponse.redirect(url, 308);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
