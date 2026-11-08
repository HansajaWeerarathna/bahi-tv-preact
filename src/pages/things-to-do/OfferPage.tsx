import { guest } from '@/entities/guest';
import { OFFERS } from '@/entities/offer';
import type { Offer } from '@/entities/offer';
import { HOTEL } from '@/shared/config';
import { language, pickText, t } from '@/shared/i18n';
import { PageLayout, QrCode } from '@/shared/ui';

const FREE_PRICE = /free|complimentary/i;

type OfferViewProps = {
  offer: Offer;
};

function OfferView({ offer }: OfferViewProps) {
  const roomNumber = guest.value.roomNumber;
  const bookingKey = offer.id.replace(/^offer-/, '');
  const bookingUrl = `${HOTEL.bookingUrl}/${bookingKey}?room=${roomNumber}`;
  const isFree = FREE_PRICE.test(offer.price.en);
  const facts = [
    { label: t('offerPage.when'), value: pickText(offer.timing) },
    { label: t('offerPage.where'), value: pickText(offer.location) },
    { label: t('offerPage.howLong'), value: pickText(offer.duration) },
    { label: t('offerPage.price'), value: pickText(offer.price) },
  ];

  return (
    <main class="absolute inset-0 overflow-hidden bg-canvas text-cream">
      <div class="absolute inset-y-0 left-0 w-180 overflow-hidden">
        <img src={offer.image} alt="" class="block size-full object-cover" />
        <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,12,0.95)_0%,rgba(20,16,12,0.6)_48%,rgba(20,16,12,0.05)_100%)]" />
        {offer.photoCredit && (
          <p class="absolute start-6 end-6 bottom-5 z-[3] text-caption leading-[normal] text-cream-muted">
            {offer.photoCredit}
          </p>
        )}
      </div>
      <div class="absolute top-24 bottom-18 left-[816px] flex w-[1008px] flex-col">
        <h1 class="mb-6 font-serif text-display leading-[1.02] font-medium">
          {pickText(offer.title)}
        </h1>
        <p class="mb-8 max-w-[900px] text-body leading-[1.45] text-cream-muted">
          {pickText(offer.description)}
        </p>
        <dl class="mb-8 border-t border-line">
          {facts.map((fact) => (
            <div
              key={fact.label}
              class="grid grid-cols-[220px_1fr] gap-6 border-b border-line py-3.5 text-label leading-[normal]"
            >
              <dt class="text-cream-muted">{fact.label}</dt>
              <dd class="m-0 font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <h2 class="mb-3 text-label leading-[normal] font-semibold text-cream-muted">
          {t('offerPage.included')}
        </h2>
        <ul class="grid gap-3">
          {offer.includes[language.value].map((item) => (
            <li
              key={item}
              class="relative pl-8 text-label leading-[1.35] before:absolute before:top-[0.55em] before:left-0.5 before:h-[7px] before:w-3 before:-rotate-45 before:border-b-2 before:border-l-2 before:border-cream-muted before:content-['']"
            >
              {item}
            </li>
          ))}
        </ul>
        <div class="mt-auto flex items-center gap-6">
          <div class="shrink-0 rounded-sm bg-white p-2.5">
            <QrCode
              value={bookingUrl}
              label={t('offerPage.scanToBook')}
              size={136}
              margin={3}
              light="#FFFFFF"
            />
          </div>
          <div class="min-w-0 flex-1">
            <p class="mb-2 text-body leading-[normal] font-semibold">{t('offerPage.scanToBook')}</p>
            <p class="text-caption leading-[1.45] text-cream-muted">
              {isFree ? t('offerPage.freeNote') : t('offerPage.chargeNote')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

type OfferPageProps = {
  offerId?: string;
};

export function OfferPage({ offerId }: OfferPageProps) {
  const offer = OFFERS.find((entry) => entry.id === offerId);
  if (!offer) return <PageLayout title={t('thingsToDoPage.title')}>{null}</PageLayout>;
  return <OfferView offer={offer} />;
}
