import { useLocation } from 'preact-iso';
import { ROUTES } from '@/shared/config';
import { t } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { RemoteHints } from './RemoteHints';

// Shown for an address that does not exist, or for an item id that is not in the data.
export function NotFoundView() {
  const { route } = useLocation();
  const { focusProps } = useFocusable({
    id: 'not-found-home',
    group: 'not-found',
    onSelect: () => route(ROUTES.home),
  });
  useInitialFocus('not-found-home');

  return (
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-10">
      <p class="font-serif text-display">{t('notFound.message')}</p>
      <button
        type="button"
        {...focusProps}
        class="tv-focus tile-surface px-8 py-4 text-body font-semibold"
      >
        {t('notFound.backHome')}
      </button>
      <RemoteHints class="absolute inset-x-24 bottom-14" />
    </div>
  );
}
