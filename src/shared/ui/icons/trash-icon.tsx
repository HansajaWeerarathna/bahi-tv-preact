import { LineIcon, type IconProps } from './LineIcon';

export const TrashIcon = (props: IconProps) => (
  <LineIcon {...props} strokeWidth={2}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
  </LineIcon>
);
