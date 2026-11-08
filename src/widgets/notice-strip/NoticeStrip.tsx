import { useLocation } from 'preact-iso';
import { hotelTime } from '@/entities/clock';
import { guest } from '@/entities/guest';
import { unreadMessages } from '@/entities/message';
import { getHomeNotice, type HomeNotice } from '@/entities/stay';
import { ROUTES } from '@/shared/config';
import { pickText, t } from '@/shared/i18n';
import { toIsoDate } from '@/shared/lib/time';
import { useFocusable } from '@/shared/remote-navigation';

function getNoticeText(notice: HomeNotice): string {
  if (notice.textKey === 'notice.oneMessage') {
    return t(notice.textKey, { sender: pickText(notice.sender) });
  }
  if (notice.textKey === 'notice.manyMessages') {
    return t(notice.textKey, { count: notice.count });
  }
  return t(notice.textKey, { time: notice.time });
}

type NoticeButtonProps = {
  notice: HomeNotice;
};

function NoticeButton({ notice }: NoticeButtonProps) {
  const { route } = useLocation();
  const { focusProps } = useFocusable({
    id: 'notice',
    group: 'notice',
    onSelect: () => route(notice.kind === 'messages' ? ROUTES.messages : ROUTES.checkOut),
  });

  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus flex h-[72px] w-full items-center justify-between gap-8 tile-surface px-8 text-start"
    >
      <span class="text-body font-medium">{getNoticeText(notice)}</span>
      <span class="text-label font-semibold text-cream-muted">{t('notice.action')}</span>
    </button>
  );
}

export function NoticeStrip() {
  const notice = getHomeNotice({
    unreadMessages: unreadMessages.value,
    guest: guest.value,
    todayIso: toIsoDate(hotelTime.value),
  });
  if (!notice) return null;
  return (
    <div class="mt-auto mb-6">
      <NoticeButton notice={notice} />
    </div>
  );
}
