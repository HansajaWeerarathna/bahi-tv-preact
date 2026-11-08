import type { TimeParts } from '@/shared/lib/time';

export type ProgramSlot = {
  start: number;
  end: number;
  progress: number;
};

const HOURS_PER_DAY = 24;
const PERCENT = 100;

export function getProgramSlot(parts: TimeParts): ProgramSlot {
  return {
    start: parts.hour,
    end: (parts.hour + 1) % HOURS_PER_DAY,
    progress: Math.round((parts.minute / 60) * PERCENT),
  };
}

export function formatTvHour(hour: number, use12Hour: boolean): string {
  const wrapped = ((hour % HOURS_PER_DAY) + HOURS_PER_DAY) % HOURS_PER_DAY;
  if (!use12Hour) return `${String(wrapped).padStart(2, '0')}:00`;
  const period = wrapped < 12 ? 'AM' : 'PM';
  return `${((wrapped + 11) % 12) + 1}:00 ${period}`;
}
