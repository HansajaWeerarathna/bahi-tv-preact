import { useState } from 'preact/hooks';

type SpotlightPhotoProps = {
  src: string;
};

type LoadState = 'loading' | 'loaded' | 'failed';

export function SpotlightPhoto({ src }: SpotlightPhotoProps) {
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
        class={
          loadState === 'loaded'
            ? 'absolute inset-0 size-full object-cover opacity-100 transition-opacity duration-[600ms]'
            : 'absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-[600ms]'
        }
      />
      <div class="absolute inset-0 scrim-offer" />
    </div>
  );
}
