import { signal } from '@preact/signals';
import type { FocusCandidate, FocusDirection } from '../types';
import { findNextFocus } from '../lib/find-next-focus';

type FocusEntry = {
  group: string;
  returnToLast: boolean;
  getElement: () => HTMLElement | null;
  onSelect?: () => void;
};

export const focusedId = signal<string | null>(null);
// The last item the guest pressed OK on: Home returns focus here.
export const lastSelectedId = signal<string | null>(null);

const entries = new Map<string, FocusEntry>();
const lastFocusedByGroup = new Map<string, string>();
// The last content item focused (not a returnToLast item): where header and notice return to.
let lastContentId: string | null = null;

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
  if (!entry.returnToLast) lastContentId = id;
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

  // Stay inside the current group when it has something in that direction; otherwise look everywhere.
  const sameGroup = candidates.filter((candidate) => candidate.group === current.group);
  const next =
    findNextFocus(direction, from, sameGroup) ?? findNextFocus(direction, from, candidates);
  if (!next) return;

  // Header and notice items return to the last content item, if it is in that direction.
  const returnTarget = current.returnToLast ? lastContentId : null;
  const returnCandidate = candidates.filter((candidate) => candidate.id === returnTarget);
  if (returnTarget && findNextFocus(direction, from, returnCandidate)) {
    setFocus(returnTarget);
    return;
  }

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
  lastSelectedId.value = id;
  entries.get(id)?.onSelect?.();
}
