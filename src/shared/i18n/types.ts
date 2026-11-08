import type { en } from './locales/en';

export type Language = 'en' | 'ar';
export type Localized = Record<Language, string>;

type DeepStringRecord<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringRecord<T[K]>;
};
export type Dictionary = DeepStringRecord<typeof en>;

type LeafPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : LeafPaths<T[K], `${Prefix}${K}.`>;
}[keyof T & string];
export type TranslationKey = LeafPaths<typeof en>;
