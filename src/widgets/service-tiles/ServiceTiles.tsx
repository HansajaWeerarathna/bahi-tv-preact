import { CompactTile } from './CompactTile';
import { PrimaryTile } from './PrimaryTile';
import { ENABLED_COMPACT_TILES, ENABLED_PRIMARY_TILES } from './tiles';

export function ServiceTiles() {
  return (
    <div class="flex flex-col gap-4">
      <div class="flex gap-6">
        {ENABLED_PRIMARY_TILES.map((tile) => (
          <PrimaryTile key={tile.id} tile={tile} />
        ))}
      </div>
      <div class="flex gap-4">
        {ENABLED_COMPACT_TILES.map((tile) => (
          <CompactTile key={tile.id} tile={tile} />
        ))}
      </div>
    </div>
  );
}
