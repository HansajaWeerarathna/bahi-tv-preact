const PART_FORMAT = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
};

export function toTimeParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', { ...PART_FORMAT, timeZone }).formatToParts(date);
  const value = (type) => Number(parts.find((part) => part.type === type).value);
  return {
    year: value('year'),
    month: value('month'),
    day: value('day'),
    hour: value('hour'),
    minute: value('minute'),
  };
}

function toUtcDate({ year, month, day, hour, minute }) {
  return new Date(Date.UTC(year, month - 1, day, hour, minute));
}

export function formatClockTime(parts, { language, use12Hour }) {
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: use12Hour,
    timeZone: 'UTC',
  }).format(toUtcDate(parts));
}

export function formatLongDate(parts, language) {
  const date = toUtcDate(parts);
  if (language === 'ar') {
    return new Intl.DateTimeFormat('ar-AE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(date);
  }
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'UTC' }).format(
    date,
  );
  const month = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(date);
  return `${weekday}, ${parts.day} ${month}`;
}

export function toIsoDate({ year, month, day }) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
