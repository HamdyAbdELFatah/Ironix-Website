import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isPlausibleEmail, joinWaitlist, readUtm } from './join-waitlist';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://project.supabase.co/');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon-key');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('isPlausibleEmail', () => {
  it('accepts normal addresses and rejects obvious garbage', () => {
    expect(isPlausibleEmail('user@example.com')).toBe(true);
    expect(isPlausibleEmail('  user@example.com  ')).toBe(true);
    expect(isPlausibleEmail('user@example')).toBe(false);
    expect(isPlausibleEmail('not an email')).toBe(false);
  });
});

describe('readUtm', () => {
  it('keeps only utm_* parameters', () => {
    expect(readUtm('?utm_source=ig&utm_campaign=launch&ref=x')).toEqual({
      utm_source: 'ig',
      utm_campaign: 'launch',
    });
  });
});

describe('joinWaitlist', () => {
  it('never calls the server for an invalid email', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    expect(await joinWaitlist({ email: 'nope', locale: 'en', source: 'hero' })).toEqual({
      ok: false,
      error: 'invalid_email',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts to the join_waitlist RPC with the anon key', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true })));
    vi.stubGlobal('fetch', fetchMock);

    const result = await joinWaitlist({
      email: 'user@example.com',
      locale: 'ar',
      source: 'footer',
      utm: { utm_source: 'ig' },
    });

    expect(result).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://project.supabase.co/rest/v1/rpc/join_waitlist');
    expect(init.headers.apikey).toBe('anon-key');
    expect(JSON.parse(init.body)).toEqual({
      p_email: 'user@example.com',
      p_locale: 'ar',
      p_source: 'footer',
      p_utm: { utm_source: 'ig' },
    });
  });

  it('maps server and network failures to a user-facing error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false, error: 'rate_limited' }))));
    expect(await joinWaitlist({ email: 'user@example.com', locale: 'en', source: 'hero' })).toEqual({
      ok: false,
      error: 'rate_limited',
    });

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    expect(await joinWaitlist({ email: 'user@example.com', locale: 'en', source: 'hero' })).toEqual({
      ok: false,
      error: 'unavailable',
    });
  });

  it('reports unavailable when Supabase is not configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
    expect(await joinWaitlist({ email: 'user@example.com', locale: 'en', source: 'hero' })).toEqual({
      ok: false,
      error: 'unavailable',
    });
  });
});
