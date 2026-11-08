import clsx from 'clsx';
import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { pickText, t } from '@/shared/i18n';
import { setFocus, useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { RemoteHints } from '@/shared/ui';
import {
  SEARCH_KEY_ROWS,
  SEARCH_MAX_QUERY,
  keyWidthPx,
  type KeyAction,
  type SearchKeyDef,
} from './keyboard';
import { DeleteGlyph, GlassGlyph } from './search-icons';
import { findSearchItems, type SearchItem } from './search-items';

const KEY_GROUP = 'search-keys';
const RESULT_GROUP = 'search-results';

function keyLabel(def: SearchKeyDef): string {
  const action = def.action;
  if (action.kind === 'space') return t('searchPage.space');
  if (action.kind === 'clear') return t('searchPage.clear');
  if (action.kind === 'go') return t('searchPage.go');
  return def.label;
}

type SearchKeyProps = {
  id: string;
  def: SearchKeyDef;
  onPress: (action: KeyAction) => void;
};

function SearchKey({ id, def, onPress }: SearchKeyProps) {
  const { focusProps } = useFocusable({
    id,
    group: KEY_GROUP,
    onSelect: () => onPress(def.action),
  });
  const isChar = def.action.kind === 'char';
  const isDelete = def.action.kind === 'delete';
  const isGo = def.action.kind === 'go';

  return (
    <button
      type="button"
      {...focusProps}
      aria-label={isDelete ? t('searchPage.delete') : keyLabel(def)}
      style={{ width: `${keyWidthPx(def.width)}px` }}
      class={clsx(
        'box-border flex h-20 items-center justify-center rounded-sm border text-cream',
        'data-[focused]:border-2 data-[focused]:border-gold data-[focused]:bg-gold data-[focused]:text-gold-ink',
        isChar
          ? 'border-line-strong text-body font-medium'
          : 'gap-2.5 border-line-strong bg-surface-1 text-label font-semibold',
      )}
    >
      {isDelete && <DeleteGlyph size={30} class="shrink-0" />}
      {isGo && (
        <>
          <GlassGlyph size={30} class="shrink-0" />
          <span>{keyLabel(def)}</span>
        </>
      )}
      {!isDelete && !isGo && keyLabel(def)}
    </button>
  );
}

type ResultRowProps = {
  id: string;
  item: SearchItem;
};

function ResultRow({ id, item }: ResultRowProps) {
  const { route } = useLocation();
  const { focusProps } = useFocusable({
    id,
    group: RESULT_GROUP,
    onSelect: () => route(item.path),
  });
  const sub = item.sub ? pickText(item.sub) : null;

  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus flex min-h-21 items-center justify-between rounded-sm border-b border-line px-6 py-3 text-left"
    >
      <span class="flex min-w-0 flex-col">
        <span class="text-body leading-[normal] font-semibold">{pickText(item.title)}</span>
        {sub && <span class="mt-0.5 text-label leading-[normal] text-cream-muted">{sub}</span>}
      </span>
    </button>
  );
}

function Cursor() {
  return (
    <span
      aria-hidden="true"
      class="h-10 w-[3px] animate-[search-cursor-blink_1s_steps(1,end)_infinite] bg-cream"
    />
  );
}

export function SearchPage() {
  const [query, setQuery] = useState('');
  const results = findSearchItems(query);
  useInitialFocus('key-0');

  function press(action: KeyAction): void {
    if (action.kind === 'char') {
      setQuery((current) => (current + action.value).slice(0, SEARCH_MAX_QUERY));
    } else if (action.kind === 'space') {
      setQuery((current) => (current + ' ').slice(0, SEARCH_MAX_QUERY));
    } else if (action.kind === 'delete') {
      setQuery((current) => current.slice(0, -1));
    } else if (action.kind === 'clear') {
      setQuery('');
    } else if (action.kind === 'go' && results.length > 0) {
      setFocus('result-0');
    }
  }

  const trimmed = query.trim();
  const heading = trimmed
    ? t('searchPage.resultsFor', { query: trimmed })
    : t('searchPage.popular');
  let keyNumber = 0;

  return (
    <main class="absolute inset-0 flex flex-col gap-8 bg-canvas px-24 pt-14 pb-9">
      <header>
        <h1 class="font-serif text-display leading-[1.1] font-normal">{t('searchPage.title')}</h1>
        <p class="mt-1 text-body leading-[normal] text-cream-muted">{t('searchPage.subtitle')}</p>
      </header>

      <div class="flex min-h-20 items-center gap-[18px] rounded-sm border border-line-strong bg-surface-1 px-6 text-title font-medium">
        <GlassGlyph size={32} class="shrink-0 text-cream-muted" />
        <span class="inline-flex items-center gap-0.5">
          {query ? (
            <>
              <span>{query}</span>
              <Cursor />
            </>
          ) : (
            <>
              <Cursor />
              <span class="text-body font-normal text-cream-muted">
                {t('searchPage.placeholder')}
              </span>
            </>
          )}
        </span>
      </div>

      <div class="flex min-h-0 flex-1 gap-16">
        <div class="-m-2 flex min-w-0 flex-1 [scrollbar-width:none] flex-col overflow-y-auto p-2">
          <p class="mb-2 px-6 text-label leading-[normal] font-semibold text-cream-muted">
            {heading}
          </p>
          {results.length === 0 ? (
            <p class="mt-3 px-6 text-body leading-[normal] text-cream-muted">
              {t('searchPage.none')}
            </p>
          ) : (
            results.map((item, index) => (
              <ResultRow key={item.id} id={`result-${index}`} item={item} />
            ))
          )}
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex w-[900px] flex-col gap-2.5 [direction:ltr]">
            {SEARCH_KEY_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} class="flex justify-center gap-2.5">
                {row.map((def) => {
                  const id = `key-${keyNumber}`;
                  keyNumber += 1;
                  return <SearchKey key={id} id={id} def={def} onPress={press} />;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <RemoteHints variant="page" class="mt-auto" />
    </main>
  );
}
