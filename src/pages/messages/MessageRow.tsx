import type { Message } from '@/entities/message';
import { markAsRead } from '@/entities/message';
import { pickText, t } from '@/shared/i18n';
import { useFocusable } from '@/shared/remote-navigation';

type MessageRowProps = {
  message: Message;
};

export function MessageRow({ message }: MessageRowProps) {
  const { focusProps } = useFocusable({
    id: `message-${message.id}`,
    group: 'messages',
    onSelect: () => markAsRead(message.id),
  });

  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus flex w-full items-center justify-between gap-6 rounded-sm px-6 py-5 text-start"
    >
      <span class="flex min-w-0 flex-1 flex-col gap-1.5">
        <span class="text-body leading-[normal] font-semibold">{pickText(message.subject)}</span>
        <span class="mt-1 text-caption leading-[1.35] text-cream-muted">
          {pickText(message.body)}
        </span>
      </span>
      <span class="flex shrink-0 flex-col items-end text-end text-body leading-[normal] font-semibold">
        <span>{pickText(message.sender)}</span>
        <span class="mt-0.5 text-cream-muted">{message.time}</span>
        {message.isUnread && <span class="mt-0.5 text-gold">{t('messages.new')}</span>}
      </span>
    </button>
  );
}
