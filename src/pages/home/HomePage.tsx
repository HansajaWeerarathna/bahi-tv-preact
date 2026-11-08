import { HomeBackground } from '@/widgets/home-background';
import { HomeHeader } from '@/widgets/home-header';
import { GreetingBand } from '@/widgets/greeting-band';
import { NoticeStrip } from '@/widgets/notice-strip';
import { OfferSpotlight } from '@/widgets/offer-spotlight';
import { lastHomeFocus, ServiceTiles } from '@/widgets/service-tiles';
import { t } from '@/shared/i18n';
import { useInitialFocus } from '@/shared/remote-navigation';
import { RemoteHints } from '@/shared/ui';

export function HomePage() {
  useInitialFocus(lastHomeFocus.value, 'tile-frontDesk');

  return (
    <>
      <HomeBackground />
      <main class="relative flex h-full flex-col px-24 py-[54px]">
        <HomeHeader />
        <GreetingBand />
        <NoticeStrip />
        <OfferSpotlight />
        <ServiceTiles />
        <RemoteHints class="mt-8 pt-1" endText={t('hotel.footerName')} />
      </main>
    </>
  );
}
