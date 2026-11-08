import clsx from 'clsx';
import { t } from '@/shared/i18n';
import { BackIcon, HintArrowIcon } from './icons';

type RemoteHintsProps = {
  class?: string;
  endText?: string;
  variant?: 'home' | 'page';
};

export function RemoteHints({ class: className, endText, variant = 'home' }: RemoteHintsProps) {
  const isPage = variant === 'page';
  const arrows = (
    <span class={clsx('flex items-center gap-1', isPage ? 'pe-1' : 'ps-1')}>
      <HintArrowIcon direction="up" />
      <HintArrowIcon direction="down" />
      <HintArrowIcon direction="left" />
      <HintArrowIcon direction="right" />
    </span>
  );
  return (
    <div
      aria-hidden="true"
      class={clsx(
        'flex items-center',
        isPage ? 'justify-center border-t border-line pt-4' : 'justify-between',
        className,
      )}
    >
      <div
        class={clsx(
          'flex items-center text-caption',
          isPage
            ? 'ms-1 gap-10 leading-[normal] text-cream-muted'
            : 'gap-9 font-medium text-cream-subtle',
        )}
      >
        {isPage ? (
          <>
            {arrows}
            <span>{t('hints.navigate')}</span>
          </>
        ) : (
          <span class="flex items-center gap-2.5">
            {arrows}
            {t('hints.navigate')}
          </span>
        )}
        <span>{t('hints.select')}</span>
        <span class="flex items-center gap-2">
          <BackIcon />
          {t('hints.back')}
        </span>
      </div>
      {endText && <span class="text-caption text-cream-subtle">{endText}</span>}
    </div>
  );
}
