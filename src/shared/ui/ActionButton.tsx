import clsx from 'clsx';
import type { JSX } from 'preact';
import type { TranslationKey } from '@/shared/i18n';
import { t } from '@/shared/i18n';

type ActionVariant = 'gold' | 'danger' | 'dangerOutline' | 'outline';

type ActionButtonProps = {
  focusProps: JSX.IntrinsicElements['button'];
  labelKey: TranslationKey;
  labelValues?: Record<string, string | number>;
  variant: ActionVariant;
};

const VARIANT_CLASSES: Record<ActionVariant, string> = {
  gold: 'border-gold bg-gold text-gold-ink',
  danger: 'border-danger bg-danger text-cream',
  dangerOutline: 'border-danger bg-transparent text-cream',
  outline: 'border-line-strong bg-canvas/90 text-cream',
};

export function ActionButton({ focusProps, labelKey, labelValues, variant }: ActionButtonProps) {
  return (
    <button
      type="button"
      {...focusProps}
      class={clsx(
        'flex h-18 items-center rounded-full border-2 px-9 text-body leading-[normal] font-semibold data-[focused]:border-gold data-[focused]:bg-gold data-[focused]:text-gold-ink',
        VARIANT_CLASSES[variant],
      )}
    >
      {t(labelKey, labelValues)}
    </button>
  );
}
