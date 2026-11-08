import type { ComponentChildren } from 'preact';
import { RemoteHints } from './RemoteHints';

type PageLayoutProps = {
  title: string;
  children: ComponentChildren;
};

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <main class="absolute inset-0 flex flex-col bg-canvas px-24 pt-14 pb-9">
      <h1 class="font-serif text-display">{title}</h1>
      {children}
      <RemoteHints variant="page" class="mt-auto" />
    </main>
  );
}
