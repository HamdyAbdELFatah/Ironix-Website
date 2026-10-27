import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useMediaQuery } from './use-media-query';

afterEach(() => vi.restoreAllMocks());

describe('useMediaQuery', () => {
  it('reflects viewport changes and unsubscribes when unmounted', () => {
    let matches = false;
    let listener: (() => void) | undefined;
    const remove = vi.fn();
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      media: query,
      get matches() { return matches; },
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_event, callback) => { listener = callback as () => void; }),
      removeEventListener: remove,
      dispatchEvent: vi.fn(),
    }));

    const { result, unmount } = renderHook(() => useMediaQuery('(min-width: 800px)'));
    expect(result.current).toBe(false);
    act(() => { matches = true; listener?.(); });
    expect(result.current).toBe(true);
    unmount();
    expect(remove).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
