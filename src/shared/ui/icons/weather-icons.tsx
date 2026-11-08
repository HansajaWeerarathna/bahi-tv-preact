import { LineIcon, type IconProps } from './LineIcon';

export const PartlyCloudyIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M12 2v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="M20 12h2" />
    <path d="m19.07 4.93-1.41 1.41" />
    <path d="M15.95 12.65a4 4 0 0 0-5.93-4.13" />
    <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
  </LineIcon>
);

export const CloudIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </LineIcon>
);

export const RainIcon = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24" />
    <path d="M16 14v6" />
    <path d="M8 14v6" />
    <path d="M12 16v6" />
  </LineIcon>
);
