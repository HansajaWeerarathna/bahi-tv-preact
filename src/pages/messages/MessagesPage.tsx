import { messages } from '@/entities/message';
import { t } from '@/shared/i18n';
import { useInitialFocus } from '@/shared/remote-navigation';
import { PageLayout } from '@/shared/ui';
import { MessageRow } from './MessageRow';

export function MessagesPage() {
  const list = messages.value;
  const firstId = list[0]?.id;
  useInitialFocus(firstId ? `message-${firstId}` : null);

  return (
    <PageLayout title={t('messages.title')}>
      {list.length === 0 ? (
        <p class="mt-8 text-body leading-[normal] text-cream-muted">{t('messages.empty')}</p>
      ) : (
        <div class="mt-8 flex max-w-[1100px] flex-col gap-[18px]">
          {list.map((message) => (
            <MessageRow key={message.id} message={message} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}
