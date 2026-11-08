import { effect, signal, untracked } from '@preact/signals';
import { hotelTime } from '@/entities/clock';
import { showToast } from '@/shared/ui';
import { t } from '@/shared/i18n';
import type { TimeParts } from '@/shared/lib/time';
import {
  adjustDraft,
  formatAlarmTime,
  newDraft,
  ringKey,
  shouldRing,
  type Alarm,
  type AlarmDraft,
  type DraftField,
  type NowParts,
} from './lib/alarm-rules';

const RING_TOAST_MS = 8000;
const NOTE_TOAST_MS = 1600;

export const alarms = signal<Alarm[]>([]);
export const alarmDraft = signal<AlarmDraft>(newDraft());

let nextId = 1;
const lastFired = new Map<number, string>();

// Fresh draft for a new alarm, as the Add button does.
export function startNewAlarm(): void {
  alarmDraft.value = newDraft();
}

export function adjustAlarmDraft(field: DraftField, step: number): void {
  alarmDraft.value = adjustDraft(alarmDraft.value, field, step);
}

export function toggleAlarmDay(index: number): void {
  const draft = alarmDraft.value;
  alarmDraft.value = {
    ...draft,
    days: draft.days.map((on, dayIndex) => (dayIndex === index ? !on : on)),
  };
}

export function saveAlarmDraft(): void {
  const draft = alarmDraft.value;
  if (draft.id === null) {
    alarms.value = [
      ...alarms.value,
      { id: nextId++, hour: draft.hour, minute: draft.minute, on: true, days: [...draft.days] },
    ];
  } else {
    alarms.value = alarms.value.map((alarm) =>
      alarm.id === draft.id
        ? { ...alarm, hour: draft.hour, minute: draft.minute, days: [...draft.days] }
        : alarm,
    );
  }
  showToast(t('alarmsPage.saved'), NOTE_TOAST_MS);
}

export function setAlarmOn(id: number, on: boolean): void {
  alarms.value = alarms.value.map((alarm) => (alarm.id === id ? { ...alarm, on } : alarm));
}

export function deleteAlarm(id: number): void {
  alarms.value = alarms.value.filter((alarm) => alarm.id !== id);
  showToast(t('alarmsPage.deleted'), NOTE_TOAST_MS);
}

export function clearAlarms(): void {
  alarms.value = [];
  showToast(t('alarmsPage.cleared'), NOTE_TOAST_MS);
}

// Shows the message for each alarm that is due. A one-time alarm switches itself off after it rings.
export function ringDueAlarms(now: TimeParts, weekday: number): void {
  const parts: NowParts = {
    hour: now.hour,
    minute: now.minute,
    weekday,
    dateKey: `${now.year}-${now.month}-${now.day}`,
  };
  let changed = false;
  const next = alarms.value.map((alarm) => {
    if (!shouldRing(alarm, parts, lastFired.get(alarm.id))) return alarm;
    lastFired.set(alarm.id, ringKey(alarm, parts));
    showToast(t('alarmsPage.ringToast', { time: formatTime(alarm) }), RING_TOAST_MS);
    if (!alarm.days.some(Boolean)) {
      changed = true;
      return { ...alarm, on: false };
    }
    return alarm;
  });
  if (changed) alarms.value = next;
}

// Weekday from the hotel's calendar date, independent of the device time zone.
function weekdayOf(now: TimeParts): number {
  return new Date(Date.UTC(now.year, now.month - 1, now.day)).getUTCDay();
}

function formatTime(alarm: Alarm): string {
  return formatAlarmTime(alarm.hour, alarm.minute, t('alarmsPage.am'), t('alarmsPage.pm'));
}

// Starts the once-a-minute ring check against the hotel clock. Returns a stop function.
export function startAlarmRing(): () => void {
  return effect(() => {
    const now = hotelTime.value;
    untracked(() => ringDueAlarms(now, weekdayOf(now)));
  });
}
