import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client. Safe to use in Client Components.
 * Reads anon credentials from public env vars — never put the service-role
 * key here.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
