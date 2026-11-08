import { useLayoutEffect } from 'preact/hooks';
import { setFocus } from '../model/focus-registry';

export function useInitialFocus(...preferredIds: (string | null | undefined)[]): void {
  useLayoutEffect(() => {
    preferredIds.find((id) => id && setFocus(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
