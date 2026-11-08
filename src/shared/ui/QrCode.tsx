import { useEffect, useState } from 'preact/hooks';

type QrCodeProps = {
  value: string;
  label: string;
  size: number;
  margin?: number;
  light?: string;
};

const renderedCodes = new Map<string, Promise<string>>();

function renderCode(value: string, margin: number, light: string): Promise<string> {
  const key = `${margin}|${light}|${value}`;
  const existing = renderedCodes.get(key);
  if (existing) return existing;

  const code = import('qrcode').then(({ default: QRCode }) =>
    QRCode.toString(value, { type: 'svg', margin, color: { dark: '#14100C', light } }),
  );
  code.catch(() => renderedCodes.delete(key));
  renderedCodes.set(key, code);
  return code;
}

export function QrCode({ value, label, size, margin = 4, light = '#F7F1E8' }: QrCodeProps) {
  const [markup, setMarkup] = useState('');

  useEffect(() => {
    let cancelled = false;
    renderCode(value, margin, light)
      .then((svg) => {
        if (!cancelled) setMarkup(svg);
      })
      .catch(() => {
        if (!cancelled) setMarkup('');
      });
    return () => {
      cancelled = true;
    };
  }, [value, margin, light]);

  return (
    <div
      role="img"
      aria-label={label}
      class="shrink-0 [&>svg]:size-full"
      style={`width: ${size}px; height: ${size}px`}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
