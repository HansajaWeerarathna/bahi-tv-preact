import { useRef, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { hotelTime } from '@/entities/clock';
import { guest } from '@/entities/guest';
import { GUEST_REQUESTS } from '@/entities/guest-request';
import type { GuestRequest } from '@/entities/guest-request';
import { addMessage } from '@/entities/message';
import { use12Hour } from '@/entities/preferences';
import { sendRequest, sentAt } from '@/features/request-housekeeping';
import { ROUTES } from '@/shared/config';
import { pickText, t } from '@/shared/i18n';
import { clamp } from '@/shared/lib/clamp';
import { formatClockTime } from '@/shared/lib/time';
import {
  focusedId,
  setFocus,
  useFocusable,
  useInitialFocus,
  useRemoteKeyHandler,
} from '@/shared/remote-navigation';
import { ActionButton, NotFoundView, PageLayout, QuantityControl } from '@/shared/ui';
import { buildRequestMessage } from './messages';

const QTY_ID = 'request-qty';

type RequestViewProps = {
  request: GuestRequest;
};

function RequestView({ request }: RequestViewProps) {
  const { route } = useLocation();
  const [qty, setQty] = useState(1);
  const sending = useRef(false);
  const isCountable = request.maxQty > 1;
  const alreadyAt = sentAt.value[request.id];
  const room = guest.value.roomNumber;

  const qtyControl = useFocusable<HTMLDivElement>({ id: QTY_ID, group: 'page-actions' });
  const send = useFocusable({
    id: 'request-send',
    group: 'page-actions',
    onSelect: () => {
      if (sending.current) return;
      sending.current = true;
      const time = formatClockTime(hotelTime.value, { language: 'en', use12Hour: use12Hour.value });
      const sent = sendRequest(request, qty, time);
      addMessage(buildRequestMessage(sent, room, time));
      // Replace this form in history, so Back from the done screen cannot resend it.
      route(ROUTES.roomServiceRequestDone, true);
    },
  });
  const cancel = useFocusable({
    id: 'request-cancel',
    group: 'page-actions',
    onSelect: () => history.back(),
  });
  useInitialFocus(isCountable ? QTY_ID : 'request-send');

  useRemoteKeyHandler((action) => {
    if (!isCountable || focusedId.value !== QTY_ID) return false;
    if (action === 'left') setQty((value) => clamp(value - 1, 1, request.maxQty));
    else if (action === 'right') setQty((value) => clamp(value + 1, 1, request.maxQty));
    else if (action === 'down') setFocus('request-send');
    else return false;
    return true;
  });

  const alreadyText = alreadyAt ? ` ${t('roomService.requestedAt', { time: alreadyAt })}.` : '';

  return (
    <PageLayout title={pickText(request.title)}>
      <div class="mt-8 flex max-w-[1100px] flex-col">
        <p class="text-body leading-[1.48] text-cream-muted">
          {t('roomService.requestBody', { detail: pickText(request.detail), eta: request.etaMin })}
          {alreadyText}
        </p>
        {isCountable && (
          <div class="mt-6">
            <QuantityControl
              focusProps={qtyControl.focusProps}
              label={t('roomService.howMany')}
              value={qty}
            />
          </div>
        )}
        {isCountable && (
          <p class="mt-6 text-caption leading-[normal] text-cream-subtle">
            {t('roomService.howManyHint')}
          </p>
        )}
        <div class="mt-8 flex gap-6">
          <ActionButton
            focusProps={send.focusProps}
            labelKey="roomService.sendRequest"
            variant="outline"
          />
          <ActionButton
            focusProps={cancel.focusProps}
            labelKey="roomService.cancel"
            variant="outline"
          />
        </div>
      </div>
    </PageLayout>
  );
}

type RequestPageProps = {
  requestId?: string;
};

export function RequestPage({ requestId }: RequestPageProps) {
  const request = GUEST_REQUESTS.find((entry) => entry.id === requestId);
  if (!request) return <NotFoundView />;
  return <RequestView request={request} />;
}
