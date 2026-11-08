import { signal } from '@preact/signals';

export type SystemState = 'ready' | 'loading' | 'reset';

// 'loading' is the start-up screen; 'reset' is shown between guests. Only 'ready' shows the TV.
export const systemState = signal<SystemState>('ready');
