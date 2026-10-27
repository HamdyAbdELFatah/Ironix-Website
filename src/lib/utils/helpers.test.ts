import { describe, it, expect, vi } from 'vitest';
import {
  formatNumber,
  isRtlLocale,
  getLocaleDirection,
  scrollToSection,
} from './helpers';

describe('Helpers Utility Functions', () => {
  describe('formatNumber', () => {
    it('formats numbers less than 1,000 as plain string', () => {
      expect(formatNumber(500)).toBe('500');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(999)).toBe('999');
    });

    it('formats thousands with K suffix and removes trailing .0', () => {
      expect(formatNumber(1000)).toBe('1K');
      expect(formatNumber(50000)).toBe('50K');
      expect(formatNumber(1500)).toBe('1.5K');
    });

    it('formats millions with M suffix and removes trailing .0', () => {
      expect(formatNumber(1000000)).toBe('1M');
      expect(formatNumber(2600000)).toBe('2.6M');
    });
  });

  describe('isRtlLocale & getLocaleDirection', () => {
    it('identifies Arabic as RTL', () => {
      expect(isRtlLocale('ar')).toBe(true);
      expect(getLocaleDirection('ar')).toBe('rtl');
    });

    it('identifies English, Spanish, German as LTR', () => {
      expect(isRtlLocale('en')).toBe(false);
      expect(getLocaleDirection('en')).toBe('ltr');
      expect(isRtlLocale('es')).toBe(false);
      expect(getLocaleDirection('es')).toBe('ltr');
      expect(isRtlLocale('de')).toBe(false);
      expect(getLocaleDirection('de')).toBe('ltr');
    });
  });

  describe('scrollToSection', () => {
    it('executes window.scrollTo when element is found', () => {
      const scrollToMock = vi.spyOn(window, 'scrollTo');
      const div = document.createElement('div');
      div.id = 'features';
      div.getBoundingClientRect = () => ({
        top: 300,
        bottom: 400,
        left: 0,
        right: 0,
        width: 100,
        height: 100,
        x: 0,
        y: 300,
        toJSON: () => {},
      });
      document.body.appendChild(div);

      scrollToSection('features');
      expect(scrollToMock).toHaveBeenCalled();
      document.body.removeChild(div);
    });

    it('gracefully does nothing if element is missing', () => {
      const scrollToMock = vi.spyOn(window, 'scrollTo');
      scrollToMock.mockClear();
      scrollToSection('non-existent-section');
      expect(scrollToMock).not.toHaveBeenCalled();
    });
  });
});
