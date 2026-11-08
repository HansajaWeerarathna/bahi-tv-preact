import { describe, expect, it } from 'vitest';
import {
  adjustDraft,
  formatAlarmTime,
  newDraft,
  repeatLabel,
  ringKey,
  shouldRing,
  type Alarm,
  type RepeatLabels,
} from './alarm-rules';

const LABELS: RepeatLabels = {
  once: 'Once',
  everyDay: 'Every day',
  weekdays: 'Weekdays',
  dayName: (index) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index] ?? '',
};

const NONE = [false, false, false, false, false, false, false];
const WEEKDAYS = [false, true, true, true, true, true, false];
const MON_WED = [false, true, false, true, false, false, false];

function alarm(overrides: Partial<Alarm> = {}): Alarm {
  return { id: 1, hour: 7, minute: 0, on: true, days: [...NONE], ...overrides };
}

describe('repeatLabel', () => {
  it('reads a one-time alarm as Once', () => {
    expect(repeatLabel(NONE, LABELS)).toBe('Once');
  });

  it('reads all seven days as Every day, and Monday to Friday as Weekdays', () => {
    expect(repeatLabel([true, true, true, true, true, true, true], LABELS)).toBe('Every day');
    expect(repeatLabel(WEEKDAYS, LABELS)).toBe('Weekdays');
  });

  it('lists the chosen day names otherwise', () => {
    expect(repeatLabel(MON_WED, LABELS)).toBe('Mon, Wed');
  });
});

describe('formatAlarmTime', () => {
  it('shows a 12-hour clock with AM or PM', () => {
    expect(formatAlarmTime(7, 0, 'AM', 'PM')).toBe('7:00 AM');
    expect(formatAlarmTime(0, 5, 'AM', 'PM')).toBe('12:05 AM');
    expect(formatAlarmTime(12, 30, 'AM', 'PM')).toBe('12:30 PM');
    expect(formatAlarmTime(19, 45, 'AM', 'PM')).toBe('7:45 PM');
  });
});

describe('adjustDraft', () => {
  it('steps the hour within the same half of the day', () => {
    expect(adjustDraft(newDraft(), 'hour', -1).hour).toBe(6);
    expect(adjustDraft({ ...newDraft(), hour: 0 }, 'hour', -1).hour).toBe(11);
    expect(adjustDraft({ ...newDraft(), hour: 23 }, 'hour', 1).hour).toBe(12);
  });

  it('wraps the minute from 59 to 0 and back', () => {
    expect(adjustDraft({ ...newDraft(), minute: 59 }, 'minute', 1).minute).toBe(0);
    expect(adjustDraft(newDraft(), 'minute', -1).minute).toBe(59);
  });

  it('flips AM and PM', () => {
    expect(adjustDraft(newDraft(), 'period', 1).hour).toBe(19);
  });
});

describe('shouldRing', () => {
  const monday = { hour: 7, minute: 0, weekday: 1, dateKey: '2026-11-09' };

  it('rings at the alarm time', () => {
    expect(shouldRing(alarm(), monday, undefined)).toBe(true);
  });

  it('stays quiet when the alarm is off or the time is different', () => {
    expect(shouldRing(alarm({ on: false }), monday, undefined)).toBe(false);
    expect(shouldRing(alarm(), { ...monday, minute: 1 }, undefined)).toBe(false);
  });

  it('rings a repeating alarm only on its chosen days', () => {
    expect(shouldRing(alarm({ days: MON_WED }), monday, undefined)).toBe(true);
    expect(shouldRing(alarm({ days: MON_WED }), { ...monday, weekday: 2 }, undefined)).toBe(false);
  });

  it('rings once per day and time', () => {
    const key = ringKey(alarm(), monday);
    expect(shouldRing(alarm(), monday, key)).toBe(false);
  });
});
