import { computed, signal } from '@preact/signals';

export const language = signal('en');
export const isRtl = computed(() => language.value === 'ar');
