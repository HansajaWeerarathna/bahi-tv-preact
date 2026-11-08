import clsx from 'clsx';
import { useState } from 'preact/hooks';
import { MOTION_CLASS } from './motion';

type SpotlightPhotoProps = {
  src: string;
  // Slow zoom, when background motion is on in Settings.
  animated?: boolean;
};

type LoadState = 'loading' | 'loaded' | 'failed';

export function SpotlightPhoto({ src, animated = false }: SpotlightPhotoProps) {
  const [loadState, setLoadState] = useState<LoadState>('loading');

  return (
    <div class="absolute inset-0">
      <img
        src={src}
        alt=""
        width={1600}
        height={1067}
        decoding="async"
        onLoad={() => setLoadState('loaded')}
        onError={() => setLoadState('failed')}
        class={clsx(
          'absolute inset-0 size-full object-cover transition-opacity duration-[600ms]',
          loadState === 'loaded' ? 'opacity-100' : 'opacity-0',
          animated && MOTION_CLASS,
        )}
      />
      <div class="absolute inset-0 scrim-offer" />
    </div>
  );
}
