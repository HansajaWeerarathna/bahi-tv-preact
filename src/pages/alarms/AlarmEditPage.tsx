import clsx from 'clsx';
import type { ComponentChildren } from 'preact';
import { useLocation } from 'preact-iso';
import {
  adjustAlarmDraft,
  alarmDraft,
  formatAlarmTime,
  saveAlarmDraft,
  toggleAlarmDay,
  type DraftField,
} from '@/features/alarms';
import { ROUTES } from '@/shared/config';
import { t, type TranslationKey } from '@/shared/i18n';
import {
  focusedId,
  setFocus,
  useFocusable,
  useInitialFocus,
  useRemoteKeyHandler,
} from '@/shared/remote-navigation';
import { ActionButton, PageLayout } from '@/shared/ui';

const GROUP = 'alarm-edit';
const HOUR_ID = 'alarm-hour';
const MINUTE_ID = 'alarm-minute';
const PERIOD_ID = 'alarm-period';
const FIRST_DAY_ID = 'alarm-day-0';
const FIELD_BY_ID: Record<string, DraftField> = {
  [HOUR_ID]: 'hour',
  [MINUTE_ID]: 'minute',
  [PERIOD_ID]: 'period',
};
const NEXT_FIELD: Record<string, string> = {
  [HOUR_ID]: MINUTE_ID,
  [MINUTE_ID]: PERIOD_ID,
};
const PREVIOUS_FIELD: Record<string, string> = {
  [MINUTE_ID]: HOUR_ID,
  [PERIOD_ID]: MINUTE_ID,
};
const DAY_KEYS: TranslationKey[] = [
  'alarmsPage.day.sun',
  'alarmsPage.day.mon',
  'alarmsPage.day.tue',
  'alarmsPage.day.wed',
  'alarmsPage.day.thu',
  'alarmsPage.day.fri',
  'alarmsPage.day.sat',
];

type PickCardProps = {
  id: string;
  name: string;
  state: string;
  onSelect: () => void;
};

// Hour, minute and AM/PM: OK steps forward, Up and Down step back and forward.
function PickCard({ id, name, state, onSelect }: PickCardProps) {
  const { focusProps } = useFocusable({ id, group: GROUP, onSelect });
  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus flex min-h-24 items-center rounded-sm border-b border-line px-6 py-5 text-left"
    >
      <span class="flex min-w-0 flex-1 flex-col gap-1">
        <span class="text-body leading-[normal] font-semibold">{name}</span>
        <span class="text-label leading-[normal] text-cream-muted">{state}</span>
      </span>
    </button>
  );
}

type DayButtonProps = {
  index: number;
  label: string;
  on: boolean;
};

function DayButton({ index, label, on }: DayButtonProps) {
  const { focusProps } = useFocusable({
    id: `alarm-day-${index}`,
    group: GROUP,
    onSelect: () => toggleAlarmDay(index),
  });
  return (
    <button
      type="button"
      {...focusProps}
      class={clsx(
        'h-16 min-w-24 rounded-full border-2 px-[18px] text-label transition duration-150 data-[focused]:scale-[1.02] data-[focused]:border-gold data-[focused]:shadow-[0_0_0_2px_var(--color-gold)]',
        on ? 'border-gold bg-gold text-canvas' : 'border-line-strong bg-surface-1 text-cream',
      )}
    >
      {label}
    </button>
  );
}

type FormFrameProps = {
  children: ComponentChildren;
};

function FormFrame({ children }: FormFrameProps) {
  return <div class="mt-8 flex flex-col gap-6">{children}</div>;
}

export function AlarmEditPage() {
  const draft = alarmDraft.value;
  const { route } = useLocation();
  const hour12 = draft.hour % 12 === 0 ? 12 : draft.hour % 12;
  const periodLabel = draft.hour < 12 ? t('alarmsPage.am') : t('alarmsPage.pm');

  useInitialFocus('alarm-hour');
  useRemoteKeyHandler((action) => {
    const current = focusedId.value ?? '';
    const field = FIELD_BY_ID[current];
    // Like the original: Up and Down change a time field, Left and Right move between fields.
    if (field) {
      if (action === 'up') adjustAlarmDraft(field, -1);
      else if (action === 'down') adjustAlarmDraft(field, 1);
      else if (action === 'right') setFocus(NEXT_FIELD[current] ?? FIRST_DAY_ID);
      else if (action === 'left') {
        const previous = PREVIOUS_FIELD[current];
        if (previous) setFocus(previous);
      } else return false;
      return true;
    }
    // From the first weekday, Left goes back to AM/PM, so the days can be left again.
    if (current === FIRST_DAY_ID && action === 'left') {
      setFocus(PERIOD_ID);
      return true;
    }
    return false;
  });

  const save = useFocusable({
    id: 'alarm-save',
    group: GROUP,
    onSelect: () => {
      saveAlarmDraft();
      route(ROUTES.alarms);
    },
  });
  const cancel = useFocusable({
    id: 'alarm-cancel',
    group: GROUP,
    onSelect: () => route(ROUTES.alarms),
  });

  return (
    <PageLayout title={t(draft.id === null ? 'alarmsPage.newTitle' : 'alarmsPage.editTitle')}>
      <FormFrame>
        <div class="mt-1.5 mb-1 text-center text-display leading-[normal] font-semibold">
          {formatAlarmTime(draft.hour, draft.minute, t('alarmsPage.am'), t('alarmsPage.pm'))}
        </div>
        <div class="grid grid-cols-2 gap-x-12">
          <PickCard
            id="alarm-hour"
            name={t('alarmsPage.hour')}
            state={String(hour12)}
            onSelect={() => adjustAlarmDraft('hour', 1)}
          />
          <PickCard
            id="alarm-minute"
            name={t('alarmsPage.minute')}
            state={String(draft.minute).padStart(2, '0')}
            onSelect={() => adjustAlarmDraft('minute', 1)}
          />
          <PickCard
            id="alarm-period"
            name={t('alarmsPage.period')}
            state={periodLabel}
            onSelect={() => adjustAlarmDraft('period', 1)}
          />
        </div>
        <p class="mt-1 mb-2.5 text-label leading-[normal] text-cream-muted">
          {t('alarmsPage.repeat')}
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          {DAY_KEYS.map((key, index) => (
            <DayButton key={key} index={index} label={t(key)} on={draft.days[index] === true} />
          ))}
        </div>
        <div class="mt-2 flex items-center gap-6">
          <ActionButton focusProps={save.focusProps} labelKey="alarmsPage.save" variant="outline" />
          <ActionButton
            focusProps={cancel.focusProps}
            labelKey="alarmsPage.cancel"
            variant="outline"
          />
        </div>
      </FormFrame>
    </PageLayout>
  );
}
