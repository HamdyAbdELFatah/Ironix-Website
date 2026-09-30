import { getSupabasePublicConfig, supabaseHeaders } from '@/lib/supabase/public-config';

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: 'invalid_email' | 'rate_limited' | 'unavailable' };

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

export function isPlausibleEmail(email: string): boolean {
  const trimmed = email.trim();
  return trimmed.length >= 6 && trimmed.length <= 254 && EMAIL_PATTERN.test(trimmed);
}

/** UTM tags from the current URL, so we know which campaign brought the sign-up. */
export function readUtm(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const utm: Record<string, string> = {};
  params.forEach((value, key) => {
    if (key.startsWith('utm_') && value) utm[key] = value.slice(0, 100);
  });
  return utm;
}

export async function joinWaitlist(input: {
  email: string;
  locale: string;
  source: string;
  utm?: Record<string, string>;
}): Promise<WaitlistResult> {
  if (!isPlausibleEmail(input.email)) return { ok: false, error: 'invalid_email' };

  const config = getSupabasePublicConfig();
  if (!config) return { ok: false, error: 'unavailable' };

  try {
    const res = await fetch(`${config.url}/rest/v1/rpc/join_waitlist`, {
      method: 'POST',
      headers: supabaseHeaders(config),
      body: JSON.stringify({
        p_email: input.email.trim(),
        p_locale: input.locale,
        p_source: input.source,
        p_utm: input.utm ?? {},
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { ok: false, error: 'unavailable' };
    const body = (await res.json()) as { ok?: boolean; error?: string };
    if (body.ok) return { ok: true };
    if (body.error === 'invalid_email' || body.error === 'rate_limited') {
      return { ok: false, error: body.error };
    }
    return { ok: false, error: 'unavailable' };
  } catch {
    return { ok: false, error: 'unavailable' };
  }
}
