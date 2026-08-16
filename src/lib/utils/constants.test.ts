import { describe, it, expect } from 'vitest';
import { APP_CONFIG } from './constants';

describe('APP_CONFIG and UTM links', () => {
  it('has valid metadata fields', () => {
    expect(APP_CONFIG.name).toBe('Ironix');
    expect(APP_CONFIG.url).toBe('https://ironix.app');
    expect(APP_CONFIG.support.email).toBe('support@ironix.app');
  });

  it('generates authentic store URLs with UTM tracking parameters', () => {
    const iosUrl = APP_CONFIG.utm('ios', 'hero');
    expect(iosUrl).toContain('https://apps.apple.com');
    expect(iosUrl).toContain('utm_source=landing');
    expect(iosUrl).toContain('utm_medium=ios');
    expect(iosUrl).toContain('utm_content=hero');

    const androidUrl = APP_CONFIG.utm('android', 'cta');
    expect(androidUrl).toContain('play.google.com/store/apps/details?id=com.ironix');
    expect(androidUrl).toContain('utm_medium=android');
    expect(androidUrl).toContain('utm_content=cta');

    const huaweiUrl = APP_CONFIG.utm('huawei', 'mobile-menu');
    expect(huaweiUrl).toContain('appgallery.huawei.com');
    expect(huaweiUrl).toContain('utm_medium=huawei');
    expect(huaweiUrl).toContain('utm_content=mobile-menu');
  });

  it('returns "#" placeholder when base URL is "#"', () => {
    const customConfig = {
      ...APP_CONFIG,
      appStore: '#',
    };
    expect(customConfig.utm('ios', 'hero')).toBe('#');
  });
});
