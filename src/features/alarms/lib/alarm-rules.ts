export type Alarm = {
  id: number;
  hour: number;
  minute: number;
  on: boolean;
  days: boolean[];
};

export type AlarmDraft = {
  id: number | null;
  hour: number;
  minute: number;
  days: boolean[];
};

export type DraftField = 'hour' | 'minute' | 'period';

export type NowParts = {
  hour: number;
  minute: number;
  weekday: number;
  dateKey: string;
};

const NO_DAYS: boolean[] = [false, false, false, false, false, false, false];

export function newDraft(): AlarmDraft {
  return { id: null, hour: 7, minute: 0, days: [...NO_DAYS] };
}

// Hour and minute wrap like a wheel; the period flips between AM and PM.
export function adjustDraft(draft: AlarmDraft, field: DraftField, step: number): AlarmDraft {
  if (field === 'hour') {
    const base = draft.hour >= 12 ? 12 : 0;
    return { ...draft, hour: base + ((draft.hour - base + step + 12) % 12) };
  }
  if (field === 'minute') {
    return { ...draft, minute: (draft.minute + step + 60) % 60 };
  }
  return { ...draft, hour: (draft.hour + 12) % 24 };
}

export function formatAlarmTime(hour: number, minute: number, am: string, pm: string): string {
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour < 12 ? am : pm;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

export type RepeatLabels = {
  once: string;
  everyDay: string;
  weekdays: string;
  dayName: (index: number) => string;
};

export function repeatLabel(days: boolean[], labels: RepeatLabels): string {
  const picked = days.flatMap((on, index) => (on ? [index] : []));
  if (picked.length === 0) return labels.once;
  if (picked.length === 7) return labels.everyDay;
  const weekdays = [1, 2, 3, 4, 5];
  if (picked.length === 5 && weekdays.every((day) => picked.includes(day))) return labels.weekdays;
  return picked.map(labels.dayName).join(', ');
}

// Rings once per alarm per day and time. A one-time alarm rings on its day only.
export function shouldRing(alarm: Alarm, now: NowParts, lastFiredKey: string | undefined): boolean {
  if (!alarm.on) return false;
  if (now.hour !== alarm.hour || now.minute !== alarm.minute) return false;
  const repeats = alarm.days.some(Boolean);
  if (repeats && !alarm.days[now.weekday]) return false;
  return lastFiredKey !== ringKey(alarm, now);
}

export function ringKey(alarm: Alarm, now: NowParts): string {
  return `${now.dateKey} ${alarm.hour}:${alarm.minute}`;
}
