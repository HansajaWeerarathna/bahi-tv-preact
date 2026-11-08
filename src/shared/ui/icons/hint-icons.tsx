import clsx from 'clsx';
import { LineIcon } from './LineIcon';

type Direction = 'up' | 'down' | 'left' | 'right';

const ARROW_ROTATION: Record<Direction, string> = {
  up: '',
  down: 'rotate-180',
  left: '-rotate-90',
  right: 'rotate-90',
};

type HintArrowIconProps = {
  direction: Direction;
  class?: string;
};

export const HintArrowIcon = ({ direction, class: className }: HintArrowIconProps) => (
  <LineIcon
    viewBox="0 0 16 16"
    strokeWidth={1.8}
    size="0.8em"
    class={clsx(ARROW_ROTATION[direction], className)}
  >
    <path d="M8 13V3M4 7l4-4 4 4" />
  </LineIcon>
);

export const BackIcon = ({ class: className }: { class?: string }) => (
  <LineIcon viewBox="0 0 16 16" strokeWidth={1.8} size="0.9em" class={className}>
    <path d="M6 3L2 7l4 4M2 7h7a4 4 0 0 1 0 8H7" />
  </LineIcon>
);
