import { useLocation } from 'preact-iso';
import { t } from '@/shared/i18n';
import { useFocusable } from '@/shared/remote-navigation';
import type { PrimaryTileData } from './tiles';

type PrimaryTileProps = {
  tile: PrimaryTileData;
};

export function PrimaryTile({ tile }: PrimaryTileProps) {
  const { route } = useLocation();
  const focusId = `tile-${tile.id}`;
  const { focusProps } = useFocusable({
    id: focusId,
    group: 'home-tiles',
    onSelect: () => {
      route(tile.path);
    },
  });

  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus flex h-[188px] min-w-0 flex-1 flex-col items-start justify-between tile-surface px-7 py-6 text-start data-[focused]:scale-[1.04]"
    >
      <tile.Icon size={48} />
      <span class="flex flex-col gap-1">
        <span class="text-body font-semibold whitespace-nowrap">{t(tile.labelKey)}</span>
        <span class="text-caption whitespace-nowrap text-cream-muted">
          {t(tile.hintKey, tile.hintValues)}
        </span>
      </span>
    </button>
  );
}
