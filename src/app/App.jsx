import { TvCanvas } from './TvCanvas';

export function App() {
  return (
    <TvCanvas>
      <img src="/images/lobby.jpg" alt="" class="absolute inset-0 size-full object-cover" />
      <div class="scrim-lobby absolute inset-0" />
      <p class="absolute start-24 top-14 font-serif text-display">Bahi</p>
    </TvCanvas>
  );
}
