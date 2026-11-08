import { signal } from '@preact/signals';

export const serviceTab = signal(0);
export const serviceFocusId = signal<string | null>(null);
