import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { guest } from '@/entities/guest';
import { ROUTES } from '@/shared/config';
import { t } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { ActionButton, FeedbackBanner, PageLayout } from '@/shared/ui';

export function FrontDeskPage() {
  const { route } = useLocation();
  const [isCallRequested, setIsCallRequested] = useState(false);
  const callBack = useFocusable({
    id: 'front-desk-call',
    group: 'page-actions',
    onSelect: () => setIsCallRequested(true),
  });
  const emergency = useFocusable({
    id: 'front-desk-emergency',
    group: 'page-actions',
    onSelect: () => route(ROUTES.emergency),
  });
  useInitialFocus('front-desk-call');

  return (
    <PageLayout title={t('frontDesk.title')}>
      <div class="mt-8 flex max-w-[1100px] flex-col">
        <p class="text-body leading-[1.48] text-cream-muted">{t('frontDesk.body')}</p>
        {isCallRequested && (
          <div class="mt-6 mb-2">
            <FeedbackBanner>
              {t('frontDesk.callConfirmed', { number: guest.value.roomNumber })}
            </FeedbackBanner>
          </div>
        )}
        <div class="mt-8 flex gap-6">
          <ActionButton
            focusProps={callBack.focusProps}
            labelKey="frontDesk.callMe"
            variant="gold"
          />
          <ActionButton
            focusProps={emergency.focusProps}
            labelKey="frontDesk.emergency"
            variant="dangerOutline"
          />
        </div>
      </div>
    </PageLayout>
  );
}
