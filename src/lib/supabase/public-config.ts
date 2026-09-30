/**
 * Public (anon) Supabase settings for the marketing site.
 *
 * The anon key is safe to ship to browsers — every table the site touches is
 * guarded by RLS or a SECURITY DEFINER RPC — but it must come from the
 * environment, never from a literal in source.
 */
export interface SupabasePublicConfig {
  url: string;
  anonKey: string;
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) return null;
  return { url: url.replace(/\/+$/, ''), anonKey };
}

export function supabaseHeaders(config: SupabasePublicConfig): Record<string, string> {
  return {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.anonKey}`,
    'Content-Type': 'application/json',
  };
}
