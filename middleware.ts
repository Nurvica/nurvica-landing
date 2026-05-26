import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run on every path except:
     * - _next/static, _next/image, favicon, apple-icon, icon — Next assets
     * - public files (any path ending in a common image extension)
     * The session-refresh call is cheap but skipping noisy asset paths keeps
     * dev logs clean and reduces redundant cookie traffic.
     */
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
