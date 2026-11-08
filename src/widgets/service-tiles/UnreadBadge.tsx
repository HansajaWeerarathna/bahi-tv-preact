import { unreadMessages } from '@/entities/message';
import { t } from '@/shared/i18n';

export function UnreadBadge() {
  const count = unreadMessages.value.length;
  if (count === 0) return null;

  return (
    <span
      aria-label={t('tiles.unreadCount', { count })}
      class="absolute -end-4 -top-3 flex h-7 min-w-7 items-center justify-center rounded-md border-2 border-surface-1 bg-gold px-1.5 text-caption font-semibold text-canvas tabular-nums"
    >
      {count}
    </span>
  );
}
