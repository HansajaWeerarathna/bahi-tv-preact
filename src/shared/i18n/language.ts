import { computed, signal } from '@preact/signals';
import type { Language } from './types';

export const language = signal<Language>('en');
export const isRtl = computed(() => language.value === 'ar');
