import { useLocation } from 'preact-iso';
import {
  alarms,
  clearAlarms,
  deleteAlarm,
  formatAlarmTime,
  repeatLabel,
  setAlarmOn,
  startEditAlarm,
  startNewAlarm,
  type Alarm,
  type RepeatLabels,
} from '@/features/alarms';
import { ROUTES } from '@/shared/config';
import { t, type TranslationKey } from '@/shared/i18n';
import { setFocus, useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { ActionButton, PageLayout, Switch, TrashIcon } from '@/shared/ui';

const GROUP = 'alarm-page';
const DAY_KEYS: TranslationKey[] = [
  'alarmsPage.day.sun',
  'alarmsPage.day.mon',
  'alarmsPage.day.tue',
  'alarmsPage.day.wed',
  'alarmsPage.day.thu',
  'alarmsPage.day.fri',
  'alarmsPage.day.sat',
];

function repeatLabels(): RepeatLabels {
  return {
    once: t('alarmsPage.once'),
    everyDay: t('alarmsPage.everyDay'),
    weekdays: t('alarmsPage.weekdays'),
    dayName: (index) => t(DAY_KEYS[index] ?? 'alarmsPage.day.sun'),
  };
}

// Focus ring around a single alarm control.
const FOCUS_RING =
  'border-transparent data-[focused]:border-gold data-[focused]:shadow-[0_0_0_2px_var(--color-gold)] data-[focused]:scale-[1.02] transition duration-150';

type AlarmRowProps = {
  alarm: Alarm;
};

function AlarmRow({ alarm }: AlarmRowProps) {
  const { route } = useLocation();
  const toggle = useFocusable({
    id: `alarm-toggle-${alarm.id}`,
    group: GROUP,
    onSelect: () => setAlarmOn(alarm.id, !alarm.on),
  });
  const edit = useFocusable({
    id: `alarm-edit-${alarm.id}`,
    group: GROUP,
    onSelect: () => {
      startEditAlarm(alarm);
      route(ROUTES.alarmEdit.replace(':alarmId', String(alarm.id)));
    },
  });
  const remove = useFocusable({
    id: `alarm-delete-${alarm.id}`,
    group: GROUP,
    onSelect: () => {
      deleteAlarm(alarm.id);
      setFocus('alarm-add');
    },
  });

  return (
    <div class="flex items-center gap-3.5">
      <button
        type="button"
        {...edit.focusProps}
        aria-label={t('alarmsPage.edit')}
        class={`flex items-center justify-between gap-3 rounded-md border-2 px-4 py-3 text-left ${FOCUS_RING}`}
      >
        <div class="flex flex-col gap-1">
          <span class="text-heading leading-none font-semibold">
            {formatAlarmTime(alarm.hour, alarm.minute, t('alarmsPage.am'), t('alarmsPage.pm'))}
          </span>
          <span class="text-label leading-[normal] text-cream-muted">
            {repeatLabel(alarm.days, repeatLabels())}
          </span>
        </div>
      </button>
      <button
        type="button"
        {...toggle.focusProps}
        aria-label={t('alarmsPage.toggle')}
        class={`ml-auto rounded-md border-2 p-2 ${FOCUS_RING}`}
      >
        <Switch on={alarm.on} />
      </button>
      <button
        type="button"
        {...remove.focusProps}
        aria-label={t('alarmsPage.delete')}
        class={`rounded-md border-2 px-4 py-3 text-[13.333px] leading-[normal] text-cream ${FOCUS_RING}`}
      >
        <TrashIcon
          size={44}
          class="inline-flex align-baseline text-gold [&_*]:[vector-effect:non-scaling-stroke]"
        />
      </button>
    </div>
  );
}

export function AlarmsPage() {
  const list = alarms.value;
  const { route } = useLocation();
  const add = useFocusable({
    id: 'alarm-add',
    group: GROUP,
    onSelect: () => {
      startNewAlarm();
      route(ROUTES.alarmEdit.replace(':alarmId', 'new'));
    },
  });
  const clear = useFocusable({ id: 'alarm-clear', group: GROUP, onSelect: clearAlarms });
  useInitialFocus(list[0] ? `alarm-toggle-${list[0].id}` : 'alarm-add');

  return (
    <PageLayout title={t('alarmsPage.title')}>
      <div class="mt-8 flex flex-col gap-6">
        {list.length === 0 && (
          <p class="max-w-[1100px] text-body leading-[1.48] text-cream-muted">
            {t('alarmsPage.empty')}
          </p>
        )}
        <div class="my-[18px] flex flex-col gap-3.5">
          {list.map((alarm) => (
            <AlarmRow key={alarm.id} alarm={alarm} />
          ))}
        </div>
        <div class="mt-5 flex gap-3.5">
          <ActionButton focusProps={add.focusProps} labelKey="alarmsPage.add" variant="outline" />
          <ActionButton
            focusProps={clear.focusProps}
            labelKey="alarmsPage.clearAll"
            variant="outline"
          />
        </div>
      </div>
    </PageLayout>
  );
}
