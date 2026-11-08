import { useSignalEffect } from '@preact/signals';
import { highContrast, largerText } from '@/entities/preferences';
import { isRtl, language } from '@/shared/i18n';

export function useDocumentPreferences(): void {
  useSignalEffect(() => {
    const root = document.documentElement;
    root.lang = language.value;
    root.dir = isRtl.value ? 'rtl' : 'ltr';
    root.dataset.contrast = highContrast.value ? 'high' : 'normal';
    root.dataset.textSize = largerText.value ? 'large' : 'normal';
  });
}
