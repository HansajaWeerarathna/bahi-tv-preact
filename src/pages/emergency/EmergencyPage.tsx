import { useState } from 'preact/hooks';
import { guest } from '@/entities/guest';
import { HOTEL } from '@/shared/config';
import { t } from '@/shared/i18n';
import type { TranslationKey } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { ActionButton, FeedbackBanner, PageLayout } from '@/shared/ui';

type NumberRowProps = {
  labelKey: TranslationKey;
  value: string;
};

function NumberRow({ labelKey, value }: NumberRowProps) {
  return (
    <div class="flex h-24 items-center justify-between gap-6 border-b border-line px-6 text-body leading-[normal] font-semibold">
      <span>{t(labelKey)}</span>
      <span class="text-danger tabular-nums">{value}</span>
    </div>
  );
}

export function EmergencyPage() {
  const [isAlertSent, setIsAlertSent] = useState(false);
  const roomNumber = guest.value.roomNumber;
  const sendStaff = useFocusable({
    id: 'emergency-send',
    group: 'page-actions',
    onSelect: () => setIsAlertSent(true),
  });
  const cancel = useFocusable({
    id: 'emergency-cancel',
    group: 'page-actions',
    onSelect: () => history.back(),
  });
  useInitialFocus('emergency-send');

  return (
    <PageLayout title={t('emergency.title')}>
      <div class="mt-8 flex max-w-[1100px] flex-col">
        <p class="text-body leading-[1.48] text-cream-muted">
          {t('emergency.body', { extension: HOTEL.emergencyExtension })}
        </p>
        <div class="mt-6 flex flex-col gap-[18px]">
          <NumberRow
            labelKey="emergency.hotel"
            value={t('emergency.hotelValue', { extension: HOTEL.emergencyExtension })}
          />
          <NumberRow
            labelKey="emergency.desk"
            value={t('emergency.deskValue', { extension: HOTEL.frontDeskExtension })}
          />
          <NumberRow labelKey="emergency.uae" value={t('emergency.uaeValue')} />
        </div>
        {isAlertSent && (
          <div class="mt-6 mb-2">
            <FeedbackBanner tone="danger">
              {t('emergency.alertSent', { number: roomNumber })}
            </FeedbackBanner>
          </div>
        )}
        <div class="mt-8 flex gap-6">
          <ActionButton
            focusProps={sendStaff.focusProps}
            labelKey="emergency.sendStaff"
            labelValues={{ number: roomNumber }}
            variant="danger"
          />
          <ActionButton
            focusProps={cancel.focusProps}
            labelKey="emergency.cancel"
            variant="outline"
          />
        </div>
      </div>
    </PageLayout>
  );
}
