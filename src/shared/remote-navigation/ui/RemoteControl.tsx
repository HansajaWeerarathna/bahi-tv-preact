import { useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { ROUTES } from '@/shared/config';
import type { FocusDirection, RemoteAction } from '../types';
import { moveFocus, selectFocused } from '../model/focus-registry';
import { runKeyHandlers } from '../model/key-handlers';

const KEY_ACTIONS: Readonly<Record<string, RemoteAction>> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'select',
  Escape: 'back',
  Backspace: 'back',
  BrowserBack: 'back',
  Home: 'home',
  h: 'home',
  H: 'home',
  m: 'menu',
  M: 'menu',
};

const ARROW_REPEAT_MS = 120;

function isFocusDirection(action: RemoteAction): action is FocusDirection {
  return action === 'up' || action === 'down' || action === 'left' || action === 'right';
}

export function RemoteControl() {
  const { path, route } = useLocation();

  useEffect(() => {
    let lastArrowAt = Number.NEGATIVE_INFINITY;

    function handleKeyDown(event: KeyboardEvent) {
      const action = KEY_ACTIONS[event.key] ?? (/^[0-9]$/.test(event.key) ? 'digit' : null);
      if (!action) return;
      event.preventDefault();

      if (isFocusDirection(action)) {
        const now = performance.now();
        if (event.repeat && now - lastArrowAt < ARROW_REPEAT_MS) return;
        lastArrowAt = now;
      }

      if (runKeyHandlers(action, event)) return;
      if (isFocusDirection(action)) moveFocus(action);
      else if (action === 'select') selectFocused();
      else if (action === 'back' && path !== ROUTES.home) history.back();
      else if (action === 'home') route(ROUTES.home);
      else if (action === 'menu') route(ROUTES.settings);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [path, route]);

  return null;
}
