import { useLayoutEffect } from 'preact/hooks';
import { setFocus } from '../model/focus-registry';

export function useInitialFocus(...preferredIds: (string | null | undefined)[]): void {
  useLayoutEffect(() => {
    for (const id of preferredIds) {
      if (id && setFocus(id)) return;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
