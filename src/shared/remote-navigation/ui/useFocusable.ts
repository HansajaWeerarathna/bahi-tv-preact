import { useComputed } from '@preact/signals';
import { useLayoutEffect, useRef } from 'preact/hooks';
import { focusedId, registerFocusable, setFocus } from '../model/focus-registry';

type UseFocusableOptions = {
  id: string;
  group: string;
  onSelect?: () => void;
};

export function useFocusable({ id, group, onSelect }: UseFocusableOptions) {
  const ref = useRef<HTMLButtonElement>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useLayoutEffect(
    () =>
      registerFocusable(id, {
        group,
        getElement: () => ref.current,
        onSelect: () => onSelectRef.current?.(),
      }),
    [id, group],
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
