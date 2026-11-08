import type { Message } from '@/entities/message';
import type { PlacedOrder } from '@/features/order-food';
import type { SentRequest } from '@/features/request-housekeeping';
import { formatPrice } from './rows';

type MessageInput = {
  id: string;
  time: string;
  sender: Message['sender'];
  subject: Message['subject'];
  body: Message['body'];
};

function toMessage(input: MessageInput): Message {
  return { ...input, isUnread: false };
}

export function buildOrderMessage(placed: PlacedOrder, room: string, time: string): Message {
  const summaryEn = placed.lines.map((line) => `${line.qty} × ${line.item.name.en}`).join(', ');
  const summaryAr = placed.lines.map((line) => `${line.qty} × ${line.item.name.ar}`).join('، ');
  const chargeEn = placed.total > 0 ? ` ${formatPrice(placed.total)} charged to your room.` : '';
  return toMessage({
    id: `order-${Date.now()}`,
    time,
    sender: { en: 'Room service', ar: 'خدمة الغرف' },
    subject: { en: 'Your order is on its way', ar: 'طلبك في الطريق' },
    body: {
      en: `${summaryEn}. Arriving at Room ${room} in about ${placed.etaMin} minutes.${chargeEn}`,
      ar: `${summaryAr}. يصل إلى الغرفة ${room} خلال نحو ${placed.etaMin} دقيقة.`,
    },
  });
}

export function buildRequestMessage(sent: SentRequest, room: string, time: string): Message {
  return toMessage({
    id: `request-${Date.now()}`,
    time,
    sender: { en: 'Housekeeping', ar: 'خدمة التنظيف' },
    subject: { en: 'Request received', ar: 'تم استلام الطلب' },
    body: {
      en: `${sent.what.en} for Room ${room}. With you in about ${sent.etaMin} minutes.`,
      ar: `${sent.what.ar} للغرفة ${room}. خلال نحو ${sent.etaMin} دقيقة.`,
    },
  });
}
