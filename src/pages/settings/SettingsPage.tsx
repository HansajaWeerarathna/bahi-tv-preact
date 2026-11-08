import { useLocation } from 'preact-iso';
import {
  backgroundMotion,
  highContrast,
  largerText,
  subtitles,
  use12Hour,
} from '@/entities/preferences';
import { ROUTES } from '@/shared/config';
import { language, t } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { PageLayout } from '@/shared/ui';

const GROUP = 'settings';

type SettingsRowProps = {
  id: string;
  label: string;
  value: string;
  onSelect: () => void;
};

// One setting: label on the left, current value on the right. OK changes the value.
function SettingsRow({ id, label, value, onSelect }: SettingsRowProps) {
  const { focusProps } = useFocusable({ id, group: GROUP, onSelect });
  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus flex min-h-24 items-center justify-between gap-6 rounded-sm border-b border-line px-6 py-5 text-left"
    >
      <span class="text-body leading-[normal] font-semibold">{label}</span>
      <span class="text-body leading-[normal] font-semibold whitespace-nowrap text-cream-muted">
        {value}
      </span>
    </button>
  );
}

function onOff(on: boolean): string {
  return on ? t('settingsPage.on') : t('settingsPage.off');
}

export function SettingsPage() {
  const { route } = useLocation();
  useInitialFocus('settings-contrast');

  const rows: SettingsRowProps[] = [
    {
      id: 'settings-contrast',
      label: t('settingsPage.highContrast'),
      value: onOff(highContrast.value),
      onSelect: () => {
        highContrast.value = !highContrast.value;
      },
    },
    {
      id: 'settings-text',
      label: t('settingsPage.largerText'),
      value: onOff(largerText.value),
      onSelect: () => {
        largerText.value = !largerText.value;
      },
    },
    {
      id: 'settings-subtitles',
      label: t('settingsPage.subtitles'),
      value: onOff(subtitles.value),
      onSelect: () => {
        subtitles.value = !subtitles.value;
      },
    },
    {
      id: 'settings-language',
      label: t('settingsPage.language'),
      value: language.value === 'ar' ? t('settingsPage.arabic') : t('settingsPage.english'),
      onSelect: () => {
        language.value = language.value === 'ar' ? 'en' : 'ar';
      },
    },
    {
      id: 'settings-clock',
      label: t('settingsPage.clockFormat'),
      value: use12Hour.value ? t('settingsPage.hour12') : t('settingsPage.hour24'),
      onSelect: () => {
        use12Hour.value = !use12Hour.value;
      },
    },
    {
      id: 'settings-motion',
      label: t('settingsPage.backgroundMotion'),
      value: onOff(backgroundMotion.value),
      onSelect: () => {
        backgroundMotion.value = !backgroundMotion.value;
      },
    },
    {
      id: 'settings-remote',
      label: t('settingsPage.remote'),
      value: '',
      onSelect: () => route(ROUTES.remoteHelp),
    },
  ];

  return (
    <PageLayout title={t('settingsPage.title')}>
      <div class="mt-8 grid grid-cols-2 gap-x-12">
        {rows.map((row) => (
          <SettingsRow key={row.id} {...row} />
        ))}
      </div>
    </PageLayout>
  );
}
