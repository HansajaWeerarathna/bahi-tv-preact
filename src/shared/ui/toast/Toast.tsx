import clsx from 'clsx';
import { toastMessage } from './toast-model';

export function Toast() {
  const message = toastMessage.value;
  return (
    <div class="pointer-events-none absolute inset-x-0 top-16 z-40 flex justify-center">
      <div
        role="status"
        aria-live="polite"
        class={clsx(
          'rounded-md border-2 border-gold bg-surface-2 px-8 py-3.5 text-body font-semibold transition-opacity duration-150',
          message ? 'opacity-100' : 'opacity-0',
        )}
      >
        {message}
      </div>
    </div>
  );
}
