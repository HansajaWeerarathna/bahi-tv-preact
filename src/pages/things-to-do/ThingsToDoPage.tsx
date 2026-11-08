import { OFFERS } from '@/entities/offer';
import { t } from '@/shared/i18n';
import { useInitialFocus } from '@/shared/remote-navigation';
import { PageLayout } from '@/shared/ui';
import { OfferCard } from './OfferCard';

export function ThingsToDoPage() {
  const firstId = OFFERS[0]?.id;
  useInitialFocus(firstId ? `offer-${firstId}` : null);

  return (
    <PageLayout title={t('thingsToDoPage.title')}>
      <p class="mt-8 text-body leading-[1.48] text-cream-muted">{t('thingsToDoPage.subtitle')}</p>
      <div class="mt-10 grid grid-cols-[748px_minmax(0,1fr)] gap-x-12">
        {OFFERS.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </PageLayout>
  );
}
