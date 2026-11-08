import clsx from 'clsx';
import type { TranslationKey } from '@/shared/i18n';
import { t } from '@/shared/i18n';
import { useFocusable } from '@/shared/remote-navigation';
import { serviceTab } from './state';

const TAB_LABELS = [
  'roomService.tabMenu',
  'roomService.tabRequests',
  'roomService.tabRestaurants',
  'roomService.tabAmenities',
] as const satisfies readonly TranslationKey[];

type TabButtonProps = {
  index: number;
  labelKey: TranslationKey;
};

function TabButton({ index, labelKey }: TabButtonProps) {
  const isActive = serviceTab.value === index;
  const { focusProps } = useFocusable({
    id: `rs-tab-${index}`,
    group: 'rs-tabs',
    onSelect: () => {
      serviceTab.value = index;
    },
  });

  return (
    <button
      type="button"
      {...focusProps}
      class={clsx(
        'tv-focus rounded-sm px-5 py-3 text-body leading-[normal] font-semibold',
        isActive ? 'text-cream' : 'text-cream-muted',
      )}
    >
      {t(labelKey)}
    </button>
  );
}

export function RoomServiceTabs() {
  return (
    <div class="mt-[22px] flex gap-3.5">
      {TAB_LABELS.map((labelKey, index) => (
        <TabButton key={labelKey} index={index} labelKey={labelKey} />
      ))}
    </div>
  );
}
