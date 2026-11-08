import { signal } from '@preact/signals';
import { clamp } from '@/shared/lib/clamp';

export const VOLUME_STEP = 5;

export const volume = signal(35);

export function changeVolume(step: number): void {
  volume.value = clamp(volume.value + step, 0, 100);
}
