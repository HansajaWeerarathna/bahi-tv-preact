import { signal } from '@preact/signals';
import type { FocusCandidate, FocusDirection } from '../types';
import { findNextFocus } from '../lib/find-next-focus';

export type FocusEntry = {
  group: string;
  getElement: () => HTMLElement | null;
  onSelect?: () => void;
};

export const focusedId = signal<string | null>(null);

const entries = new Map<string, FocusEntry>();
const lastFocusedByGroup = new Map<string, string>();

export function registerFocusable(id: string, entry: FocusEntry): () => void {
  entries.set(id, entry);
  return () => {
    if (entries.get(id) === entry) entries.delete(id);
  };
}

export function setFocus(id: string): boolean {
  const entry = entries.get(id);
  const element = entry?.getElement();
  if (!entry || !element) return false;
  focusedId.value = id;
  lastFocusedByGroup.set(entry.group, id);
  element.focus({ preventScroll: true });
  return true;
}

function toCandidate(id: string, group: string, element: HTMLElement): FocusCandidate {
  return { id, group, rect: element.getBoundingClientRect() };
}

export function moveFocus(direction: FocusDirection): void {
  const currentId = focusedId.value;
  if (currentId === null) return;
  const current = entries.get(currentId);
  const currentElement = current?.getElement();
  if (!current || !currentElement) return;

  const from = toCandidate(currentId, current.group, currentElement);
  const candidates: FocusCandidate[] = [];
  for (const [id, entry] of entries) {
    const element = entry.getElement();
    if (id === currentId || !element) continue;
    candidates.push(toCandidate(id, entry.group, element));
  }

  const next = findNextFocus(direction, from, candidates);
  if (!next) return;

  const remembered = lastFocusedByGroup.get(next.group);
  const isEnteringGroup = next.group !== current.group;
  const canUseRemembered =
    isEnteringGroup &&
    remembered !== undefined &&
    candidates.some((candidate) => candidate.id === remembered);

  setFocus(canUseRemembered ? remembered : next.id);
}

export function selectFocused(): void {
  const id = focusedId.value;
  if (id === null) return;
  entries.get(id)?.onSelect?.();
}
