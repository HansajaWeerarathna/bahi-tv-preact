import { afterEach, describe, expect, it } from 'vitest';
import { focusedId, registerFocusable, setFocus } from './focus-registry';

const cleanups: (() => void)[] = [];

function register(id: string, returnToLast = false): () => void {
  const element = {
    focus: () => undefined,
    getBoundingClientRect: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
  } as unknown as HTMLElement;
  const unregister = registerFocusable(id, {
    group: 'test',
    returnToLast,
    getElement: () => element,
  });
  cleanups.push(unregister);
  return unregister;
}

async function afterRender(): Promise<void> {
  await Promise.resolve();
}

afterEach(async () => {
  cleanups.splice(0).forEach((unregister) => unregister());
  await afterRender();
  focusedId.value = null;
});

describe('focus recovery', () => {
  it('returns to the last content item when the focused notice is removed', async () => {
    register('tile');
    const removeNotice = register('notice', true);
    setFocus('tile');
    setFocus('notice');

    removeNotice();
    await afterRender();

    expect(focusedId.value).toBe('tile');
  });

  it('clears focus when nothing is left on screen', async () => {
    const removeTile = register('tile');
    setFocus('tile');

    removeTile();
    await afterRender();

    expect(focusedId.value).toBeNull();
  });

  it('leaves focus alone when another item is removed', async () => {
    register('tile');
    const removeOther = register('other');
    setFocus('tile');

    removeOther();
    await afterRender();

    expect(focusedId.value).toBe('tile');
  });

  it('keeps focus when an item registers again under the same id', async () => {
    register('other');
    const removeOld = register('tile');
    setFocus('other');
    setFocus('tile');

    removeOld();
    register('tile');
    await afterRender();

    expect(focusedId.value).toBe('tile');
  });
});
