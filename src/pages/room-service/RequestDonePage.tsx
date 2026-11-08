import { useLocation } from 'preact-iso';
import { guest } from '@/entities/guest';
import { lastRequest } from '@/features/request-housekeeping';
import { HOTEL, ROUTES } from '@/shared/config';
import { pickText, t } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { ActionButton, PageLayout } from '@/shared/ui';

export function RequestDonePage() {
  const { route } = useLocation();
  const sent = lastRequest.value;
  const room = guest.value.roomNumber;
  const done = useFocusable({
    id: 'request-done',
    group: 'page-actions',
    onSelect: () => route(ROUTES.home),
  });
  useInitialFocus('request-done');

  return (
    <PageLayout title={t('roomService.requestTitle')}>
      <div class="mt-8 flex max-w-[1100px] flex-col">
        {sent && (
          <p class="text-title leading-[normal] font-medium">
            {t('roomService.requestSentLine', {
              title: pickText(sent.what),
              room,
              eta: sent.etaMin,
            })}
          </p>
        )}
        <p class="mt-6 text-body leading-[1.48] text-cream-muted">
          {t('roomService.requestFind', { extension: HOTEL.frontDeskExtension })}
        </p>
        <div class="mt-8 flex gap-6">
          <ActionButton focusProps={done.focusProps} labelKey="roomService.done" variant="gold" />
        </div>
      </div>
    </PageLayout>
  );
}
