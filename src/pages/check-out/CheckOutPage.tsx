import { useState } from 'preact/hooks';
import { guest } from '@/entities/guest';
import { t } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { ActionButton, PageLayout } from '@/shared/ui';

export function CheckOutPage() {
  const [isLateRequested, setIsLateRequested] = useState(false);
  const { checkOutTime, lateCheckOutTime } = guest.value;
  const requestLate = useFocusable({
    id: 'check-out-late',
    group: 'page-actions',
    onSelect: () => {
      guest.value = { ...guest.value, hasLateCheckOut: true };
      setIsLateRequested(true);
    },
  });
  const keepTime = useFocusable({
    id: 'check-out-keep',
    group: 'page-actions',
    onSelect: () => history.back(),
  });
  useInitialFocus('check-out-late');

  return (
    <PageLayout title={t('checkOut.title')}>
      <div class="mt-8 flex max-w-[1100px] flex-col">
        <p class="text-body leading-[1.48] text-cream-muted">
          {t('checkOut.body', { checkOutTime, lateCheckOutTime })}
        </p>
        {isLateRequested && (
          <p class="mt-6 text-base leading-[normal]">{t('checkOut.done', { lateCheckOutTime })}</p>
        )}
        <div class="mt-8 flex gap-6">
          <ActionButton
            focusProps={requestLate.focusProps}
            labelKey="checkOut.requestLate"
            variant="gold"
          />
          <ActionButton
            focusProps={keepTime.focusProps}
            labelKey="checkOut.keepTime"
            variant="outline"
          />
        </div>
      </div>
    </PageLayout>
  );
}
