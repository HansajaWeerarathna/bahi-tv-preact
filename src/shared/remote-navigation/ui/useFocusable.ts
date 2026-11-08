import { useComputed } from '@preact/signals';
import { useLayoutEffect, useRef } from 'preact/hooks';
import { focusedId, registerFocusable, setFocus } from '../model/focus-registry';

type UseFocusableOptions = {
  id: string;
  group: string;
  onSelect?: () => void;
  // Down or up from here goes back to the last content item (header and notice).
  returnToLast?: boolean;
};

export function useFocusable<T extends HTMLElement = HTMLButtonElement>({
  id,
  group,
  onSelect,
  returnToLast = false,
}: UseFocusableOptions) {
  const ref = useRef<T>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useLayoutEffect(
    () =>
      registerFocusable(id, {
        group,
        returnToLast,
        getElement: () => ref.current,
        onSelect: () => onSelectRef.current?.(),
      }),
    [id, group, returnToLast],
  );

  const isFocused = useComputed(() => focusedId.value === id);
  const tabIndex = useComputed(() => (isFocused.value ? 0 : -1));
  const dataFocused = useComputed(() => (isFocused.value ? true : undefined));

  return {
    focusProps: {
      ref,
      tabIndex,
      'data-focused': dataFocused,
      onClick: () => {
        setFocus(id);
        onSelectRef.current?.();
      },
    },
  };
}
