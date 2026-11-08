import { countNights, formatStayDate, guest } from '@/entities/guest';
import { t } from '@/shared/i18n';
import { PageLayout } from '@/shared/ui';

type KvRow = {
  label: string;
  value: string;
};

type KvSectionProps = {
  title: string;
  rows: KvRow[];
};

function KvSection({ title, rows }: KvSectionProps) {
  return (
    <section>
      <h3 class="mb-2 text-label leading-[normal] font-semibold text-cream-muted">{title}</h3>
      {rows.map((row) => (
        <div
          key={row.label}
          class="flex items-baseline justify-between gap-[18px] border-b border-line py-[9px]"
        >
          <span class="text-label leading-[normal] font-semibold">{row.label}</span>
          <span class="text-end text-caption leading-[normal] text-cream-muted">{row.value}</span>
        </div>
      ))}
    </section>
  );
}

type TimeBlockProps = {
  label: string;
  value: string;
};

function TimeBlock({ label, value }: TimeBlockProps) {
  return (
    <div class="flex flex-col items-end gap-1">
      <span class="text-caption leading-[normal] text-cream-muted">{label}</span>
      <span class="font-serif text-title leading-[normal] font-semibold">{value}</span>
    </div>
  );
}

export function StayPage() {
  const current = guest.value;
  const checkOutTime = current.hasLateCheckOut ? current.lateCheckOutTime : current.checkOutTime;
  const nights = countNights(current.checkInDate, current.checkOutDate);

  const sections: { title: string; rows: KvRow[] }[] = [
    {
      title: t('stayPage.arrivalTitle'),
      rows: [
        { label: t('stayPage.earlyCheckIn'), value: t('stayPage.earlyCheckInValue') },
        { label: t('stayPage.idAtCheckIn'), value: t('stayPage.idAtCheckInValue') },
        { label: t('stayPage.lateCheckOut'), value: t('stayPage.lateCheckOutValue') },
      ],
    },
    {
      title: t('stayPage.diningTitle'),
      rows: [
        { label: t('stayPage.arabesque'), value: t('stayPage.arabesqueValue') },
        { label: t('stayPage.lobbyCafe'), value: t('stayPage.lobbyCafeValue') },
        { label: t('stayPage.breakfast'), value: t('stayPage.breakfastValue') },
      ],
    },
    {
      title: t('stayPage.poolsTitle'),
      rows: [
        { label: t('stayPage.outdoorPool'), value: t('stayPage.outdoorPoolValue') },
        { label: t('stayPage.sauna'), value: t('stayPage.saunaValue') },
      ],
    },
    {
      title: t('stayPage.kidsTitle'),
      rows: [
        { label: t('stayPage.playground'), value: t('stayPage.playgroundValue') },
        { label: t('stayPage.babysitting'), value: t('stayPage.babysittingValue') },
      ],
    },
  ];

  return (
    <PageLayout title={t('stayPage.title')}>
      <div class="mt-8 flex flex-col gap-[26px]">
        <header class="flex items-end justify-between border-b border-line pb-[22px]">
          <div>
            <h2 class="font-serif text-heading leading-[1.05] font-normal">
              {formatStayDate(current.checkInDate)}{' '}
              <span class="mx-1.5 align-[4px] font-sans text-title leading-[1.05] text-gold">
                →
              </span>{' '}
              {formatStayDate(current.checkOutDate)}
            </h2>
            <p class="mt-2 text-label leading-[normal] text-cream-muted">
              {t('stayPage.nights', { count: nights })}
            </p>
          </div>
          <div class="flex gap-12">
            <TimeBlock label={t('stayPage.checkIn')} value={current.checkInTime} />
            <TimeBlock label={t('stayPage.checkOut')} value={checkOutTime} />
          </div>
        </header>
        <div class="grid grid-cols-2 gap-x-14 gap-y-[26px]">
          {sections.map((section) => (
            <KvSection key={section.title} title={section.title} rows={section.rows} />
          ))}
        </div>
        <p class="text-caption leading-[1.4] text-cream-muted">{t('stayPage.footnote')}</p>
      </div>
    </PageLayout>
  );
}
