import { useEffect, useRef } from 'preact/hooks';
import { pushKeyHandler, type KeyHandler } from '../model/key-handlers';

type RemoteKeyHandlerOptions = {
  always?: boolean;
};

export function useRemoteKeyHandler(
  handler: KeyHandler,
  options: RemoteKeyHandlerOptions = {},
): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  const always = options.always ?? false;
  useEffect(
    () => pushKeyHandler((action, event) => handlerRef.current(action, event), always),
    [always],
  );
}
