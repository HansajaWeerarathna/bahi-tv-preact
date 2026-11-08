import { buildGreetingOptions, getGreetingSubline, guest } from '@/entities/guest';
import { hotelTime } from '@/entities/clock';
import { GreetingHeadline } from './GreetingHeadline';
import { HeaderButtons } from './HeaderButtons';

export function GreetingBand() {
  const options = buildGreetingOptions(guest.value, hotelTime.value.hour);

  return (
    <div class="mt-16 mb-1 flex items-start justify-between gap-12">
      <div class="min-w-0 flex-1">
        <GreetingHeadline options={options} />
        <p class="text-body">{getGreetingSubline(guest.value)}</p>
      </div>
      <HeaderButtons />
    </div>
  );
}
