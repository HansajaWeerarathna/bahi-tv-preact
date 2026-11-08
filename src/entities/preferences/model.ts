import { signal } from '@preact/signals';

export const highContrast = signal(false);
export const largerText = signal(false);
export const use12Hour = signal(true);
export const subtitles = signal(true);
// Off by default: low-power TV hardware.
export const backgroundMotion = signal(false);
