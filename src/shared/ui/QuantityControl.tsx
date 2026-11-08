import type { JSX } from 'preact';

type QuantityControlProps = {
  focusProps: JSX.IntrinsicElements['div'];
  label: string;
  value: number;
  total?: string;
};

const STEP_CLASS =
  'flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold text-body leading-none text-gold';

export function QuantityControl({ focusProps, label, value, total }: QuantityControlProps) {
  return (
    <div
      {...focusProps}
      class="tv-focus flex h-24 items-center gap-12 rounded-sm px-6 text-body leading-[normal] font-semibold"
    >
      <span class="w-50 shrink-0">{label}</span>
      <span class="flex items-center gap-6">
        <span class={STEP_CLASS}>−</span>
        <span class="min-w-12 text-center text-title tabular-nums">{value}</span>
        <span class={STEP_CLASS}>+</span>
      </span>
      {total && <span class="ms-auto">{total}</span>}
    </div>
  );
}
