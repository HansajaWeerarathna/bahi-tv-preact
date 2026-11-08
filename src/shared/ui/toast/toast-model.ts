import { signal } from '@preact/signals';

export const toastMessage = signal('');
let hideTimerId: ReturnType<typeof setTimeout> | undefined;

export function showToast(message: string, durationMs = 2000) {
  clearTimeout(hideTimerId);
  toastMessage.value = message;
  hideTimerId = setTimeout(() => {
    toastMessage.value = '';
  }, durationMs);
}
