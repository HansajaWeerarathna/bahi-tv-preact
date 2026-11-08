import type { ComponentChildren } from 'preact';
import clsx from 'clsx';
import {
  raiseTemperature,
  roomControls,
  toggleCurtains,
  toggleDoNotDisturb,
  toggleLights,
} from '@/features/room-controls';
import { t } from '@/shared/i18n';
import { useFocusable, useInitialFocus } from '@/shared/remote-navigation';
import { CurtainIcon, LightIcon, MoonIcon, PageLayout, ThermometerIcon } from '@/shared/ui';

const ICON_CLASS = '[&_*]:[vector-effect:non-scaling-stroke]';

type ToggleProps = {
  on: boolean;
};

function Toggle({ on }: ToggleProps) {
  return (
    <span
      aria-hidden="true"
      class={clsx(
        'relative h-10 w-18 shrink-0 rounded-full transition-colors duration-150',
        on ? 'bg-gold' : 'bg-line',
      )}
    >
      <span
        class={clsx(
          'absolute start-1 top-1 size-8 rounded-full transition-transform duration-150',
          on ? 'bg-canvas ltr:translate-x-8 rtl:-translate-x-8' : 'bg-cream',
        )}
      />
    </span>
  );
}

type RoomControlCardProps = {
  id: string;
  icon: ComponentChildren;
  name: string;
  state: string;
  on?: boolean;
  onSelect: () => void;
};

function RoomControlCard({ id, icon, name, state, on, onSelect }: RoomControlCardProps) {
  const { focusProps } = useFocusable({ id, group: 'room-controls', onSelect });
  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus flex min-h-24 items-center gap-[22px] rounded-sm border-b border-line px-6 py-5 text-left"
    >
      <span class="inline-flex size-12 shrink-0 items-center justify-center text-cream-muted">
        {icon}
      </span>
      <span class="flex min-w-0 flex-1 flex-col gap-1">
        <span class="text-body leading-[normal] font-semibold">{name}</span>
        <span class="text-label leading-[normal] text-cream-muted">{state}</span>
      </span>
      {on !== undefined && <Toggle on={on} />}
    </button>
  );
}

export function RoomControlsPage() {
  const state = roomControls.value;
  useInitialFocus('rc-lights');

  return (
    <PageLayout title={t('roomControlsPage.title')}>
      <div class="mt-8 flex flex-col gap-6">
        <p class="max-w-[1100px] text-body leading-[1.48] text-cream-muted">
          {t('roomControlsPage.intro')}
        </p>
        <div class="grid grid-cols-2 gap-x-12">
          <RoomControlCard
            id="rc-lights"
            icon={<LightIcon size={40} class={ICON_CLASS} />}
            name={t('roomControlsPage.lights')}
            state={state.lights ? t('roomControlsPage.on') : t('roomControlsPage.off')}
            on={state.lights}
            onSelect={toggleLights}
          />
          <RoomControlCard
            id="rc-curtains"
            icon={<CurtainIcon size={40} class={ICON_CLASS} />}
            name={t('roomControlsPage.curtains')}
            state={state.curtains ? t('roomControlsPage.open') : t('roomControlsPage.closed')}
            on={state.curtains}
            onSelect={toggleCurtains}
          />
          <RoomControlCard
            id="rc-temp"
            icon={<ThermometerIcon size={40} class={ICON_CLASS} />}
            name={t('roomControlsPage.temperature')}
            state={`${state.temperatureC}°C`}
            onSelect={raiseTemperature}
          />
          <RoomControlCard
            id="rc-dnd"
            icon={<MoonIcon size={40} class={ICON_CLASS} />}
            name={t('roomControlsPage.doNotDisturb')}
            state={state.doNotDisturb ? t('roomControlsPage.on') : t('roomControlsPage.off')}
            on={state.doNotDisturb}
            onSelect={toggleDoNotDisturb}
          />
        </div>
      </div>
    </PageLayout>
  );
}
