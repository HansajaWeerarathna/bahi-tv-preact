import { t } from '@/shared/i18n';

type SystemScreenProps = {
  state: 'loading' | 'reset';
};

// Start-up and between-guests screens: a calm spinner for start-up, a message for the reset.
export function SystemScreen({ state }: SystemScreenProps) {
  return (
    <div class="absolute inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-canvas px-24 py-[54px]">
      {state === 'loading' && (
        <div class="size-18 animate-[tv-spin_1.35s_linear_infinite] rounded-full border-[5px] border-gold/[0.24] border-t-gold" />
      )}
      <p class="font-serif text-heading font-medium">
        {t(state === 'loading' ? 'system.loading' : 'system.reset')}
      </p>
    </div>
  );
}
