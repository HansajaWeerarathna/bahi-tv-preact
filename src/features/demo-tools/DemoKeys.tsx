import { useEffect } from 'preact/hooks';
import {
  legendOpen,
  reviewStatesOpen,
  toggleCheckOutDay,
  toggleLegend,
  toggleNewMessage,
  toggleOffers,
  toggleReviewStates,
} from './demo-actions';
import { KeyLegend } from './KeyLegend';
import { ReviewStatesPanel } from './ReviewStatesPanel';

const DEMO_KEY_ACTIONS: Readonly<Record<string, () => void>> = {
  n: toggleNewMessage,
  c: toggleCheckOutDay,
  p: toggleOffers,
  d: toggleLegend,
  s: toggleReviewStates,
};

export function DemoKeys() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      DEMO_KEY_ACTIONS[event.key.toLowerCase()]?.();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {legendOpen.value && <KeyLegend />}
      {reviewStatesOpen.value && <ReviewStatesPanel />}
    </>
  );
}
