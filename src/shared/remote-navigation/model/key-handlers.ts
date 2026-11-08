import type { RemoteAction } from '../types';

export type KeyHandler = (action: RemoteAction, event: KeyboardEvent) => boolean;

type RegisteredHandler = {
  handler: KeyHandler;
  // Runs even while the remote is blocked (for example during the system screens).
  always: boolean;
};

const handlers: RegisteredHandler[] = [];

export function pushKeyHandler(handler: KeyHandler, always = false): () => void {
  const entry: RegisteredHandler = { handler, always };
  handlers.push(entry);
  return () => {
    const index = handlers.indexOf(entry);
    if (index !== -1) handlers.splice(index, 1);
  };
}

// The newest handler runs first; a handler returns true to consume the key.
export function runKeyHandlers(
  action: RemoteAction,
  event: KeyboardEvent,
  blocked: boolean,
): boolean {
  return [...handlers]
    .reverse()
    .filter((entry) => !blocked || entry.always)
    .some((entry) => entry.handler(action, event));
}
