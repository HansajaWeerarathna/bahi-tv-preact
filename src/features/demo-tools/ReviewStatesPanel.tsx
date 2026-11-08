import clsx from 'clsx';
import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { ROUTES } from '@/shared/config';
import { clamp } from '@/shared/lib/clamp';
import { useRemoteKeyHandler } from '@/shared/remote-navigation';
import { applyReviewState, REVIEW_STATES } from './review-states';
import { reviewStatesOpen } from './demo-actions';

const LAST_STATE_INDEX = REVIEW_STATES.length - 1;

export function ReviewStatesPanel() {
  const [highlighted, setHighlighted] = useState(0);
  const { route } = useLocation();

  useRemoteKeyHandler(
    (action) => {
      if (action === 'up') setHighlighted((index) => clamp(index - 1, 0, LAST_STATE_INDEX));
      if (action === 'down') setHighlighted((index) => clamp(index + 1, 0, LAST_STATE_INDEX));
      if (action === 'select') {
        const state = REVIEW_STATES[highlighted];
        if (state) applyReviewState(state);
        reviewStatesOpen.value = false;
        route(ROUTES.home);
      }
      if (action === 'back') reviewStatesOpen.value = false;
      return true;
    },
    { always: true },
  );

  return (
    <div class="absolute start-24 top-[54px] z-50 w-[720px] rounded-md border-2 border-gold bg-surface-1 px-7 py-6">
      <p class="text-label font-semibold">Review states (Up/Down, OK to apply, S to close)</p>
      <ul class="mt-4 flex flex-col gap-1">
        {REVIEW_STATES.map((state, index) => (
          <li
            key={state.number}
            class={clsx(
              'flex gap-4 rounded-sm px-4 py-2 text-caption',
              index === highlighted && 'bg-surface-2 ring-2 ring-gold',
            )}
          >
            <span class="w-8 text-cream-muted tabular-nums">{state.number}</span>
            <span>{state.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
