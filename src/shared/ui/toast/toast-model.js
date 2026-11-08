import { signal } from '@preact/signals';

export const toastMessage = signal('');
let hideTimerId;

export function showToast(message, durationMs = 2000) {
  clearTimeout(hideTimerId);
  toastMessage.value = message;
  hideTimerId = setTimeout(() => {
    toastMessage.value = '';
  }, durationMs);
}
