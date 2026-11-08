export type KeyHandler = (action: RemoteAction, event: KeyboardEvent) => boolean;

import type { RemoteAction } from '../types';

const handlers: KeyHandler[] = [];

export function pushKeyHandler(handler: KeyHandler): () => void {
  handlers.push(handler);
  return () => {
    const index = handlers.indexOf(handler);
    if (index !== -1) handlers.splice(index, 1);
  };
}

export function runKeyHandlers(action: RemoteAction, event: KeyboardEvent): boolean {
  return [...handlers].reverse().some((handler) => handler(action, event));
}
