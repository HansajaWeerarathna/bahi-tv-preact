import { useEffect, useRef } from 'preact/hooks';
import { pushKeyHandler, type KeyHandler } from '../model/key-handlers';

export function useRemoteKeyHandler(handler: KeyHandler): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  useEffect(() => pushKeyHandler((action, event) => handlerRef.current(action, event)), []);
}
