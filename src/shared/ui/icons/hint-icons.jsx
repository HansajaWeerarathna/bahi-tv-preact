import clsx from 'clsx';
import { LineIcon } from './LineIcon';

const ARROW_ROTATION = { up: '', down: 'rotate-180', left: '-rotate-90', right: 'rotate-90' };

export const HintArrowIcon = ({ direction, class: className }) => (
  <LineIcon
    viewBox="0 0 16 16"
    strokeWidth={1.8}
    size="0.8em"
    class={clsx(ARROW_ROTATION[direction], className)}
  >
    <path d="M8 13V3M4 7l4-4 4 4" />
  </LineIcon>
);

export const BackIcon = ({ class: className }) => (
  <LineIcon viewBox="0 0 16 16" strokeWidth={1.8} size="0.9em" class={className}>
    <path d="M6 3L2 7l4 4M2 7h7a4 4 0 0 1 0 8H7" />
  </LineIcon>
);
