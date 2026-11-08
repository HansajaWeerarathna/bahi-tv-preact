import { LineIcon, type IconProps } from './LineIcon';

export const ConciergeBellIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" />
    <path d="M20 16a8 8 0 1 0-16 0" />
    <path d="M12 4v4" />
    <path d="M10 4h4" />
  </LineIcon>
);

export const TvIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <rect width="20" height="15" x="2" y="7" rx="2" />
    <path d="m17 2-5 5-5-5" />
  </LineIcon>
);

export const UtensilsIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </LineIcon>
);

export const CompassIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36Z" />
  </LineIcon>
);

export const MailIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </LineIcon>
);

export const WifiIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M12 20h.01" />
    <path d="M2 8.82a15 15 0 0 1 20 0" />
    <path d="M5 12.86a10 10 0 0 1 14 0" />
    <path d="M8.5 16.43a5 5 0 0 1 7 0" />
  </LineIcon>
);

export const CastIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
    <path d="M2 12a9 9 0 0 1 8 8" />
    <path d="M2 16a5 5 0 0 1 4 4" />
    <path d="M2 20h.01" />
  </LineIcon>
);

export const AlarmClockIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2 2" />
    <path d="M5 3 2 6" />
    <path d="m22 6-3-3" />
    <path d="M6.38 18.7 4 21" />
    <path d="M17.64 18.67 20 21" />
  </LineIcon>
);

export const BedDoubleIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
    <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M12 4v6" />
    <path d="M2 18h20" />
  </LineIcon>
);

export const SlidersIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4" />
  </LineIcon>
);
