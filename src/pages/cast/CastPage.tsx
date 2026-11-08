import { guest } from '@/entities/guest';
import { t } from '@/shared/i18n';
import { PageLayout, QrCode } from '@/shared/ui';

export function CastPage() {
  // Placeholder address: replace with the hotel's casting endpoint before launch.
  const payload = `https://bahi-ajman.example/cast?room=${guest.value.roomNumber}`;

  return (
    <PageLayout title={t('castPage.title')}>
      <div class="mt-8 grid grid-cols-[420px_1fr] items-start gap-16 py-2">
        <div class="flex size-[420px] shrink-0 items-center justify-center rounded-md bg-white">
          <QrCode
            value={payload}
            label={t('castPage.title')}
            size={300}
            margin={4}
            light="#FFFFFF"
          />
        </div>
        <div class="flex flex-col gap-8">
          <p class="max-w-[1100px] text-body leading-[1.48] text-cream-muted">
            {t('castPage.stepOne')}
          </p>
          <p class="max-w-[1100px] text-body leading-[1.48] text-cream-muted">
            {t('castPage.stepTwo')}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
