import { language } from './language';
import { en } from './locales/en';
import { ar } from './locales/ar';
import type { Dictionary, Language, Localized, TranslationKey } from './types';

const dictionaries: Record<Language, Dictionary> = { en, ar };

function lookup(dictionary: Dictionary, key: TranslationKey): string {
  let node: unknown = dictionary;
  for (const part of key.split('.')) {
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === 'string' ? node : key;
}

export function t(key: TranslationKey, values: Record<string, string | number> = {}) {
  return lookup(dictionaries[language.value], key).replace(/\{(\w+)\}/g, (match, name: string) =>
    String(values[name] ?? match),
  );
}

export function pickText(localized: Localized) {
  return localized[language.value];
}
