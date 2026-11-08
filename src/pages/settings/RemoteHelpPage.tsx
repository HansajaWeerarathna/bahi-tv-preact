import { HOTEL } from '@/shared/config';
import { t } from '@/shared/i18n';
import { PageLayout } from '@/shared/ui';

const GUIDE = [
  { key: 'remoteHelp.arrows', desc: 'remoteHelp.arrowsDesc' },
  { key: 'remoteHelp.ok', desc: 'remoteHelp.okDesc' },
  { key: 'remoteHelp.back', desc: 'remoteHelp.backDesc' },
  { key: 'remoteHelp.home', desc: 'remoteHelp.homeDesc' },
] as const;

// What each button on the hotel remote does. Read-only: nothing here takes focus.
export function RemoteHelpPage() {
  return (
    <PageLayout title={t('remoteHelp.title')}>
      <div class="mt-8 flex flex-col gap-6">
        <p class="max-w-[1100px] text-body leading-[1.48] text-cream-muted">
          {t('remoteHelp.desc')}
        </p>
        <div class="flex max-w-[1100px] flex-col gap-[18px]">
          {GUIDE.map((row) => (
            <div
              key={row.key}
              class="flex min-h-24 items-center justify-between gap-6 rounded-sm border-b border-line px-6 py-5"
            >
              <span class="text-body leading-[normal] font-semibold">{t(row.key)}</span>
              <span class="text-body leading-[normal] font-semibold text-cream-muted">
                {t(row.desc)}
              </span>
            </div>
          ))}
        </div>
        <p class="max-w-[1100px] text-body leading-[1.48] text-cream-muted">
          {t('remoteHelp.footer', { extension: HOTEL.frontDeskExtension })}
        </p>
      </div>
    </PageLayout>
  );
}
