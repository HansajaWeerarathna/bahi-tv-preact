import clsx from 'clsx';
import { useState } from 'preact/hooks';
import { MOTION_CLASS } from './motion';

type SpotlightPhotoProps = {
  src: string;
  // Slow zoom, when background motion is on in Settings.
  animated?: boolean;
};

export function SpotlightPhoto({ src, animated = false }: SpotlightPhotoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div class="absolute inset-0">
      <img
        src={src}
        alt=""
        width={1600}
        height={1067}
        decoding="async"
        onLoad={() => setLoaded(true)}
        class={clsx(
          'absolute inset-0 size-full object-cover transition-opacity duration-[600ms]',
          loaded ? 'opacity-100' : 'opacity-0',
          animated && MOTION_CLASS,
        )}
      />
      <div class="absolute inset-0 scrim-offer" />
    </div>
  );
}
