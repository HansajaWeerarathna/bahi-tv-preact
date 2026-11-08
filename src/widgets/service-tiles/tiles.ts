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
};

export type CompactTileData = {
  id: string;
  Icon: ComponentType<IconProps>;
  labelKey: TranslationKey;
  path: string;
  showsUnread?: boolean;
};

export const PRIMARY_TILES = [
  {
    id: 'frontDesk',
    Icon: ConciergeBellIcon,
    labelKey: 'tiles.frontDesk',
    hintKey: 'tiles.frontDeskHint',
    hintValues: { extension: HOTEL.frontDeskExtension },
    path: ROUTES.frontDesk,
  },
  {
    id: 'tv',
    Icon: TvIcon,
    labelKey: 'tiles.tv',
    hintKey: 'tiles.tvHint',
    hintValues: {},
    path: ROUTES.tv,
  },
  {
    id: 'roomService',
    Icon: UtensilsIcon,
    labelKey: 'tiles.roomService',
    hintKey: 'tiles.roomServiceHint',
    hintValues: {},
    path: ROUTES.roomService,
  },
  {
    id: 'thingsToDo',
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
    Icon: MailIcon,
    labelKey: 'tiles.messages',
    path: ROUTES.messages,
    showsUnread: true,
  },
  { id: 'wifi', Icon: WifiIcon, labelKey: 'tiles.wifi', path: ROUTES.wifi },
  { id: 'cast', Icon: CastIcon, labelKey: 'tiles.cast', path: ROUTES.cast },
  { id: 'alarm', Icon: AlarmClockIcon, labelKey: 'tiles.alarm', path: ROUTES.alarms },
  { id: 'stay', Icon: BedDoubleIcon, labelKey: 'tiles.stay', path: ROUTES.stay },
  {
    id: 'roomControls',
    Icon: SlidersIcon,
    labelKey: 'tiles.roomControls',
    path: ROUTES.roomControls,
  },
] as const satisfies readonly CompactTileData[];
