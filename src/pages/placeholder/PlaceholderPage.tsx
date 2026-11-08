import { useLocation } from 'preact-iso';
import { ROUTES } from '@/shared/config';
import { t } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { RemoteHints } from '@/shared/ui';

export function PlaceholderPage() {
  const { route } = useLocation();
  const { focusProps } = useFocusable({
    id: 'placeholder-back',
    group: 'placeholder',
    onSelect: () => route(ROUTES.home),
  });
  useInitialFocus('placeholder-back');

  return (
    <div class="absolute inset-0 flex flex-col items-center justify-center gap-10">
      <p class="font-serif text-display">{t('placeholder.comingNext')}</p>
      <button
        type="button"
        {...focusProps}
        class="tv-focus tile-surface px-8 py-4 text-body font-semibold"
      >
        {t('placeholder.backHome')}
      </button>
      <RemoteHints class="absolute inset-x-24 bottom-14" />
    </div>
  );
}
