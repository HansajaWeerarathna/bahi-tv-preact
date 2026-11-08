import { signal } from '@preact/signals';
import type { GuestRequest } from '@/entities/guest-request';
import type { Localized } from '@/shared/i18n';

export type SentRequest = {
  what: Localized;
  etaMin: number;
};

export const sentAt = signal<Readonly<Record<string, string>>>({});
export const lastRequest = signal<SentRequest | null>(null);

export function sendRequest(request: GuestRequest, quantity: number, time: string): SentRequest {
  sentAt.value = { ...sentAt.value, [request.id]: time };
  const sent: SentRequest = {
    what: {
      en: request.maxQty > 1 ? `${quantity} × ${request.title.en}` : request.title.en,
      ar: request.maxQty > 1 ? `${quantity} × ${request.title.ar}` : request.title.ar,
    },
    etaMin: request.etaMin,
  };
  lastRequest.value = sent;
  return sent;
}
