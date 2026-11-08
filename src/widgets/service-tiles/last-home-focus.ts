import { signal } from '@preact/signals';

export const lastHomeFocus = signal<string | null>(null);
