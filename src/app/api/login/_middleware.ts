import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log(`[Middleware] Request received: ${req.method} ${req.url}`, {
    headers: Object.fromEntries(req.headers),
    body: await req.text().catch(() => "Failed to read body"),
  });

  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    console.log("[Middleware] Handling OPTIONS request for /api/register");
    return response;
  }

  console.log(
    "[Middleware] CORS response headers:",
    Object.fromEntries(response.headers)
  );
  return response;
}

export const config = {
  matcher: ["/api/register"],
};
