import { useEffect, useState } from 'preact/hooks';
import QRCode from 'qrcode';

type QrCodeProps = {
  value: string;
  label: string;
  size: number;
  margin?: number;
  light?: string;
};

// Renders a QR code as SVG. The `qrcode` library builds the markup, so this component never encodes data itself.
export function QrCode({ value, label, size, margin = 4, light = '#F7F1E8' }: QrCodeProps) {
  const [markup, setMarkup] = useState('');

  useEffect(() => {
    let cancelled = false;
    QRCode.toString(value, { type: 'svg', margin, color: { dark: '#14100C', light } })
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
