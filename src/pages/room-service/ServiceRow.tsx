import { useLocation } from 'preact-iso';
import { showToast } from '@/shared/ui';
import { useFocusable } from '@/shared/remote-navigation';
import type { ServiceRow as ServiceRowData } from './rows';

const TOAST_MS = 2000;

type ServiceRowProps = {
  index: number;
  row: ServiceRowData;
};

export function ServiceRow({ index, row }: ServiceRowProps) {
  const { route } = useLocation();
  const { focusProps } = useFocusable({
    id: `rs-row-${index}`,
    group: 'rs-rows',
    onSelect: () => {
      if (row.path) route(row.path);
      else showToast(row.right ? `${row.title}, ${row.right}` : row.title, TOAST_MS);
    },
  });

  return (
    <button
      type="button"
      {...focusProps}
      class="tv-focus flex w-full items-center justify-between gap-6 rounded-sm px-6 py-3 text-start"
    >
      <span class="flex min-w-0 flex-col">
        <span class="text-body leading-[normal] font-semibold">{row.title}</span>
        <span class="text-caption leading-[1.25] text-cream-muted">{row.sub}</span>
      </span>
      <span class="shrink-0 text-body leading-[normal] font-semibold">{row.right}</span>
    </button>
  );
}
