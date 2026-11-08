import { language } from './language';
import { en } from './locales/en';
import { ar } from './locales/ar';

const dictionaries = { en, ar };

function lookup(dictionary, key) {
  return key.split('.').reduce((node, part) => node?.[part], dictionary);
}

export function t(key, values = {}) {
  const template = lookup(dictionaries[language.value], key) ?? lookup(en, key) ?? key;
  return template.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
}

export function pickText(localized) {
  return localized[language.value] ?? localized.en;
}
