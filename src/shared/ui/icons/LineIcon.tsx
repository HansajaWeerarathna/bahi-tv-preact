import type { ComponentChildren } from 'preact';
import clsx from 'clsx';

export type IconProps = {
  size?: number | string;
  class?: string;
};

type LineIconProps = IconProps & {
  viewBox?: string;
  strokeWidth?: number;
  children: ComponentChildren;
};

export function LineIcon({
  size = 24,
  viewBox = '0 0 24 24',
  strokeWidth = 1.75,
  class: className,
  children,
}: LineIconProps) {
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class={clsx('shrink-0', className)}
    >
      {children}
    </svg>
  );
}
