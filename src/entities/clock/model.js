import { computed, signal } from '@preact/signals';
import { HOTEL } from '@/shared/config';
import { toTimeParts } from '@/shared/lib/time';

const MINUTE_MS = 60_000;

const now = signal(new Date());
export const simulatedTime = signal(null);

export const hotelTime = computed(
  () => simulatedTime.value ?? toTimeParts(now.value, HOTEL.timeZone),
);

export function startClock() {
  let timerId;
  function tick() {
    now.value = new Date();
    timerId = setTimeout(tick, MINUTE_MS - (Date.now() % MINUTE_MS));
  }
  tick();
  return () => clearTimeout(timerId);
}
