import { CompactTile } from './CompactTile';
import { PrimaryTile } from './PrimaryTile';
import { COMPACT_TILES, PRIMARY_TILES } from './tiles';

export function ServiceTiles() {
  return (
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-4 gap-6">
        {PRIMARY_TILES.map((tile) => (
          <PrimaryTile key={tile.id} tile={tile} />
        ))}
      </div>
      <div class="grid grid-cols-6 gap-4">
        {COMPACT_TILES.map((tile) => (
          <CompactTile key={tile.id} tile={tile} />
        ))}
      </div>
    </div>
  );
}
