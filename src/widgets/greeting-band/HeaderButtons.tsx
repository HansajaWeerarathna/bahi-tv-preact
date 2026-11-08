import type { ComponentType } from 'preact';
import { useLocation } from 'preact-iso';
import { ROUTES } from '@/shared/config';
import type { TranslationKey } from '@/shared/i18n';
import { t } from '@/shared/i18n';
import { useFocusable } from '@/shared/remote-navigation';
import { PhoneIcon, SearchIcon, SettingsIcon, type IconProps } from '@/shared/ui';

type HeaderButtonProps = {
  id: string;
  Icon: ComponentType<IconProps>;
  labelKey: TranslationKey;
  path: string;
};

function HeaderButton({ id, Icon, labelKey, path }: HeaderButtonProps) {
  const { route } = useLocation();
  const { focusProps } = useFocusable({
    id,
    group: 'header-actions',
    onSelect: () => route(path),
  });

  return (
    <button
      type="button"
      aria-label={t(labelKey)}
      {...focusProps}
      class="tv-focus flex h-[60px] w-[68px] items-center justify-center rounded-sm"
    >
      <Icon size={40} />
    </button>
  );
}

const HEADER_ACTIONS: readonly HeaderButtonProps[] = [
  { id: 'header-frontDesk', Icon: PhoneIcon, labelKey: 'header.frontDesk', path: ROUTES.frontDesk },
  { id: 'header-settings', Icon: SettingsIcon, labelKey: 'header.settings', path: ROUTES.settings },
  { id: 'header-search', Icon: SearchIcon, labelKey: 'header.search', path: ROUTES.search },
];

export function HeaderButtons() {
  return (
    <div class="mt-2 flex shrink-0 gap-2">
      {HEADER_ACTIONS.map((action) => (
        <HeaderButton key={action.id} {...action} />
      ))}
    </div>
  );
}
