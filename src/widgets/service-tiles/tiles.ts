import type { ComponentType } from 'preact';
import { OFFERS } from '@/entities/offer';
import { HOTEL, ROUTES } from '@/shared/config';
import type { TranslationKey } from '@/shared/i18n';
import {
  AlarmClockIcon,
  BedDoubleIcon,
  CastIcon,
  CompassIcon,
  ConciergeBellIcon,
  MailIcon,
  SlidersIcon,
  TvIcon,
  UtensilsIcon,
  WifiIcon,
  type IconProps,
} from '@/shared/ui';

export type PrimaryTileData = {
  id: string;
  Icon: ComponentType<IconProps>;
  labelKey: TranslationKey;
  hintKey: TranslationKey;
  hintValues: Record<string, string | number>;
  path: string;
  enabled: boolean;
};

export type CompactTileData = {
  id: string;
  Icon: ComponentType<IconProps>;
  labelKey: TranslationKey;
  path: string;
  showsUnread?: boolean;
  enabled: boolean;
};

export const PRIMARY_TILES = [
  {
    id: 'frontDesk',
    enabled: true,
    Icon: ConciergeBellIcon,
    labelKey: 'tiles.frontDesk',
    hintKey: 'tiles.frontDeskHint',
    hintValues: { extension: HOTEL.frontDeskExtension },
    path: ROUTES.frontDesk,
  },
  {
    id: 'tv',
    enabled: true,
    Icon: TvIcon,
    labelKey: 'tiles.tv',
    hintKey: 'tiles.tvHint',
    hintValues: {},
    path: ROUTES.tv,
  },
  {
    id: 'roomService',
    enabled: true,
    Icon: UtensilsIcon,
    labelKey: 'tiles.roomService',
    hintKey: 'tiles.roomServiceHint',
    hintValues: {},
    path: ROUTES.roomService,
  },
  {
    id: 'thingsToDo',
    enabled: true,
    Icon: CompassIcon,
    labelKey: 'tiles.thingsToDo',
    hintKey: 'tiles.thingsToDoHint',
    hintValues: { count: OFFERS.length },
    path: ROUTES.thingsToDo,
  },
] as const satisfies readonly PrimaryTileData[];

export const COMPACT_TILES = [
  {
    id: 'messages',
    enabled: true,
    Icon: MailIcon,
    labelKey: 'tiles.messages',
    path: ROUTES.messages,
    showsUnread: true,
  },
  { id: 'wifi', enabled: true, Icon: WifiIcon, labelKey: 'tiles.wifi', path: ROUTES.wifi },
  { id: 'cast', enabled: true, Icon: CastIcon, labelKey: 'tiles.cast', path: ROUTES.cast },
  {
    id: 'alarm',
    enabled: true,
    Icon: AlarmClockIcon,
    labelKey: 'tiles.alarm',
    path: ROUTES.alarms,
  },
  { id: 'stay', enabled: true, Icon: BedDoubleIcon, labelKey: 'tiles.stay', path: ROUTES.stay },
  {
    id: 'roomControls',
    enabled: true,
    Icon: SlidersIcon,
    labelKey: 'tiles.roomControls',
    path: ROUTES.roomControls,
  },
] as const satisfies readonly CompactTileData[];

export const ENABLED_PRIMARY_TILES = PRIMARY_TILES.filter((tile) => tile.enabled);
export const ENABLED_COMPACT_TILES = COMPACT_TILES.filter((tile) => tile.enabled);

const firstTile = ENABLED_PRIMARY_TILES[0] ?? ENABLED_COMPACT_TILES[0];
export const FIRST_TILE_FOCUS_ID = firstTile ? `tile-${firstTile.id}` : null;
