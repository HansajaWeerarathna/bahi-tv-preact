import type { ComponentChildren } from 'preact';
import { RemoteHints } from './RemoteHints';

type PageLayoutProps = {
  title: string;
  subtitle?: string;
  children: ComponentChildren;
};

export function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <main class="absolute inset-0 flex flex-col bg-canvas px-24 pt-14 pb-9">
      <h1 class="font-serif text-display">{title}</h1>
      {subtitle && <p class="mt-1 text-body leading-[normal] text-cream-muted">{subtitle}</p>}
      {children}
      <RemoteHints variant="page" class="mt-auto" />
    </main>
  );
}
