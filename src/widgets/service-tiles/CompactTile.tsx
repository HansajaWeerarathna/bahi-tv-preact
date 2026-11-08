import { useLocation } from 'preact-iso';
import { t } from '@/shared/i18n';
import { useFocusable } from '@/shared/remote-navigation';
import { UnreadBadge } from './UnreadBadge';
import type { CompactTileData } from './tiles';

type CompactTileProps = {
  tile: CompactTileData;
};

export function CompactTile({ tile }: CompactTileProps) {
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
      class="tv-focus flex h-[88px] items-center gap-4 tile-surface px-6 text-start data-[focused]:scale-[1.06]"
    >
      <span class="relative">
        <tile.Icon size={32} />
        {tile.showsUnread && <UnreadBadge />}
      </span>
      <span class="text-label font-semibold whitespace-nowrap">{t(tile.labelKey)}</span>
    </button>
  );
}
