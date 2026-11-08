import { LineIcon, type IconProps } from './LineIcon';

export const LightIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </LineIcon>
);

export const CurtainIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M3 3h18" />
    <path d="M20 7H8" />
    <path d="M20 11H8" />
    <path d="M10 19h10" />
    <path d="M8 15h12" />
    <path d="M4 3v14" />
    <circle cx="4" cy="19" r="2" />
  </LineIcon>
);

export const ThermometerIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
  </LineIcon>
);
