import { useEffect } from 'preact/hooks';
import { t } from '@/shared/i18n';
import { clamp } from '@/shared/lib/clamp';
import {
  focusedId,
  setFocus,
  useInitialFocus,
  useRemoteKeyHandler,
} from '@/shared/remote-navigation';
import { PageLayout } from '@/shared/ui';
import { RoomServiceTabs } from './RoomServiceTabs';
import { ServiceRow } from './ServiceRow';
import { ROOM_SERVICE_TAB_COUNT, buildServiceRows } from './rows';
import { serviceFocusId, serviceTab } from './state';

const FIRST_ROW_ID = 'rs-row-0';

export function RoomServicePage() {
  const tab = serviceTab.value;
  const rows = buildServiceRows(tab);

  useInitialFocus(serviceFocusId.value ?? `rs-tab-${tab}`);
  useEffect(() => {
    serviceFocusId.value = null;
  }, []);

  useRemoteKeyHandler((action) => {
    const focused = focusedId.value;
    if (focused === FIRST_ROW_ID && action === 'up') {
      setFocus(`rs-tab-${serviceTab.value}`);
      return true;
    }
    if (focused === null || !focused.startsWith('rs-tab-')) return false;
    if (action === 'left' || action === 'right') {
      const step = action === 'right' ? 1 : -1;
      serviceTab.value = clamp(serviceTab.value + step, 0, ROOM_SERVICE_TAB_COUNT - 1);
      setFocus(`rs-tab-${serviceTab.value}`);
      return true;
    }
    if ((action === 'down' || action === 'select') && rows.length > 0) {
      setFocus(FIRST_ROW_ID);
      return true;
    }
    return false;
  });

  return (
    <PageLayout title={t('roomService.title')} subtitle={t('roomService.subtitle')}>
      <RoomServiceTabs />
      <div class="mt-[14px] flex flex-col pt-2">
        {rows.map((row, index) => (
          <ServiceRow key={`${tab}-${index}`} index={index} row={row} />
        ))}
      </div>
    </PageLayout>
  );
}
