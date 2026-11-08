import { buildWifiPayload } from '@/entities/wifi';
import { HOTEL } from '@/shared/config';
import { t } from '@/shared/i18n';
import { PageLayout, QrCode } from '@/shared/ui';

const { network, password, security } = HOTEL.wifi;
const PAYLOAD = buildWifiPayload(network, password, security);

type FieldProps = {
  label: string;
  value: string;
};

function Field({ label, value }: FieldProps) {
  return (
    <div class="border-b border-line pb-6">
      <div class="mb-1 text-label leading-[normal] text-cream-muted">{label}</div>
      <div class="text-heading leading-[normal] font-semibold">{value}</div>
    </div>
  );
}

export function WifiPage() {
  return (
    <PageLayout title={t('wifiPage.title')}>
      <div class="mt-8 grid grid-cols-[420px_1fr] items-start gap-16 py-2">
        <div class="flex size-[420px] shrink-0 items-center justify-center rounded-md bg-white">
          <QrCode
            value={PAYLOAD}
            label={t('wifiPage.title')}
            size={368}
            margin={4}
            light="#FFFFFF"
          />
        </div>
        <div class="flex flex-col gap-8">
          <Field label={t('wifiPage.network')} value={network} />
          <Field label={t('wifiPage.password')} value={password} />
          <p class="mt-2 text-body leading-[1.4] font-medium text-cream-muted">
            {t('wifiPage.scanHint')}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
