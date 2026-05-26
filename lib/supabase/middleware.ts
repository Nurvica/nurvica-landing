import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session on every request. Does NOT redirect or
 * gate — the app stays guest-friendly. Routes that require auth should check
 * the session themselves (e.g. API routes that read user-scoped data).
 *
 * Pattern from https://supabase.com/docs/guides/auth/server-side/nextjs.
 */
export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // No Supabase env vars yet (e.g. preview deploy before integration is wired)
  // — pass through silently so the app keeps working in guest mode.
  if (!url || !anon) return NextResponse.next({ request });

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    url,
    anon,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Touch the session so cookies refresh if expired. Do not remove —
  // running this call is what keeps the user signed in across requests.
  await supabase.auth.getUser();

  return supabaseResponse;
}
