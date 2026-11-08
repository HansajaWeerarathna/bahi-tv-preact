import { afterEach, describe, expect, it } from 'vitest';
import { language } from './language';
import { pickText, t } from './translate';
import { en } from './locales/en';
import { ar } from './locales/ar';

type NestedText = { [key: string]: string | NestedText };

function flattenKeys(dictionary: NestedText, prefix = ''): string[] {
  return Object.entries(dictionary).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'string' ? [fullKey] : flattenKeys(value, fullKey);
  });
}

afterEach(() => {
  language.value = 'en';
});

describe('t', () => {
  it('returns the English text for a key', () => {
    expect(t('header.search')).toBe('Search');
  });

  it('fills in placeholders', () => {
    expect(t('tiles.thingsToDoHint', { count: 4 })).toBe('4 offers');
  });

  it('leaves a placeholder in place when no value is given', () => {
    expect(t('header.room')).toBe('Room {number}');
  });

  it('returns the Arabic text when the language is Arabic', () => {
    language.value = 'ar';
    expect(t('header.search')).toBe('بحث');
  });

  it('has the same keys in English and Arabic', () => {
    expect(flattenKeys(ar).sort()).toEqual(flattenKeys(en).sort());
  });
});

describe('pickText', () => {
  it('picks the text for the current language', () => {
    language.value = 'ar';
    expect(pickText({ en: 'Spa', ar: 'السبا' })).toBe('السبا');
  });
});
