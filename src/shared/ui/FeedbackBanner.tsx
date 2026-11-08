import clsx from 'clsx';
import type { ComponentChildren } from 'preact';

type FeedbackBannerProps = {
  tone?: 'neutral' | 'danger';
  children: ComponentChildren;
};

export function FeedbackBanner({ tone = 'neutral', children }: FeedbackBannerProps) {
  return (
    <div
      role="status"
      class={clsx(
        'rounded-sm px-6 py-4 text-caption leading-[normal] font-medium',
        tone === 'danger' ? 'bg-danger/[0.24]' : 'bg-surface-2',
      )}
    >
      {children}
    </div>
  );
}
