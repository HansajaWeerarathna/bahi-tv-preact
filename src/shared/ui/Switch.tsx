import clsx from 'clsx';

type SwitchProps = {
  on: boolean;
};

// On/off switch: a gold track when on, with the knob moving to the far side.
export function Switch({ on }: SwitchProps) {
  return (
    <span
      aria-hidden="true"
      class={clsx(
        'relative block h-10 w-18 shrink-0 rounded-full transition-colors duration-150',
        on ? 'bg-gold' : 'bg-line',
      )}
    >
      <span
        class={clsx(
          'absolute start-1 top-1 size-8 rounded-full transition-transform duration-150',
          on ? 'bg-canvas ltr:translate-x-8 rtl:-translate-x-8' : 'bg-cream',
        )}
      />
    </span>
  );
}
