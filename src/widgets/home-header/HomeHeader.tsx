import { assetUrl } from '@/shared/config/base';
import { t } from '@/shared/i18n';
import { StayMeta } from './StayMeta';

export function HomeHeader() {
  return (
    <header class="flex h-[60px] items-center justify-between">
      <div class="flex h-[74px] w-[135px] items-center justify-center rounded-sm border border-transparent">
        <img
          src={assetUrl('images/bahi-logo.png')}
          alt={t('hotel.name')}
          width={406}
          height={219}
          decoding="async"
          class="h-[72px] object-contain"
        />
      </div>
      <StayMeta />
    </header>
  );
}
