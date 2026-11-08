import clsx from 'clsx';
import { useRef, useState } from 'preact/hooks';
import { MOTION_CLASS } from './motion';

type PhotoLayerProps = {
  src: string;
  animated: boolean;
  // A layer that enters plays the photo-in animation once it has loaded.
  enters: boolean;
};

function PhotoLayer({ src, animated, enters }: PhotoLayerProps) {
  const [loaded, setLoaded] = useState(!enters);

  return (
    <div class={clsx('absolute inset-0', enters && (loaded ? 'offer-photo-in' : 'opacity-0'))}>
      <img
        src={src}
        alt=""
        width={1600}
        height={1067}
        decoding="async"
        onLoad={() => setLoaded(true)}
        class={clsx('size-full object-cover', animated && MOTION_CLASS)}
      />
    </div>
  );
}

type SpotlightPhotoProps = {
  src: string;
  // Slow zoom, when background motion is on in Settings.
  animated?: boolean;
};

export function SpotlightPhoto({ src, animated = false }: SpotlightPhotoProps) {
  // The photo on screen before this one. It stays underneath while the new photo fades in,
  // so the lobby never shows between two offers.
  const shown = useRef(src);
  const previous = useRef<string | null>(null);
  if (shown.current !== src) {
    previous.current = shown.current;
    shown.current = src;
  }

  return (
    <div class="absolute inset-0">
      {previous.current && (
        <PhotoLayer
          key={previous.current}
          src={previous.current}
          animated={animated}
          enters={false}
        />
      )}
      <PhotoLayer key={src} src={src} animated={animated} enters />
      <div class="absolute inset-0 scrim-offer" />
    </div>
  );
}
