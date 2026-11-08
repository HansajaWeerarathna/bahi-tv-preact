import { useLocation } from 'preact-iso';
import { ROUTES } from '@/shared/config';
import type { TranslationKey } from '@/shared/i18n';
import { t } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';

type TestTileProps = {
  id: string;
  labelKey: TranslationKey;
  target: string;
};

function TestTile({ id, labelKey, target }: TestTileProps) {
  const { route } = useLocation();
  const { focusProps } = useFocusable({
    id,
    group: 'home-tiles',
    onSelect: () => route(target),
  });

  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus h-[188px] w-[414px] tile-surface px-7 py-6 text-start text-body font-semibold"
    >
      {t(labelKey)}
    </button>
  );
}

const TEST_TILES: readonly TestTileProps[] = [
  { id: 'frontDesk', labelKey: 'tiles.frontDesk', target: ROUTES.frontDesk },
  { id: 'tv', labelKey: 'tiles.tv', target: ROUTES.tv },
  { id: 'roomService', labelKey: 'tiles.roomService', target: ROUTES.roomService },
  { id: 'thingsToDo', labelKey: 'tiles.thingsToDo', target: ROUTES.thingsToDo },
];

export function HomePage() {
  useInitialFocus('frontDesk');

  return (
    <div class="absolute inset-x-24 top-1/2 flex -translate-y-1/2 gap-6">
      {TEST_TILES.map((tile) => (
        <TestTile key={tile.id} {...tile} />
      ))}
    </div>
  );
}
