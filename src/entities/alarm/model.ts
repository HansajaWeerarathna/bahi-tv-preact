import { signal } from '@preact/signals';
import type { Alarm } from './types';

export const alarms = signal<Alarm[]>([]);

export function resetAlarms(): void {
  alarms.value = [];
}
