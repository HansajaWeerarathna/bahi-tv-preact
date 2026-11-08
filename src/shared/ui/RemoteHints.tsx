import clsx from 'clsx';
import { t } from '@/shared/i18n';
import { BackIcon, HintArrowIcon } from './icons';

type RemoteHintsProps = {
  class?: string;
  endText?: string;
};

export function RemoteHints({ class: className, endText }: RemoteHintsProps) {
  return (
    <div aria-hidden="true" class={clsx('flex items-center justify-between', className)}>
      <div class="flex items-center gap-9 text-caption font-medium text-cream-subtle">
        <span class="flex items-center gap-2">
          <span class="flex items-center gap-1">
            <HintArrowIcon direction="up" />
            <HintArrowIcon direction="down" />
            <HintArrowIcon direction="left" />
            <HintArrowIcon direction="right" />
          </span>
          {t('hints.navigate')}
        </span>
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
