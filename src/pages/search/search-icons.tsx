type GlyphProps = {
  size: number;
  class?: string;
};

// Magnifier, used in the query field and on the Search key.
export function GlassGlyph({ size, class: className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      class={className}
    >
      <circle cx="12.5" cy="12.5" r="7" stroke="currentColor" stroke-width="2.2" />
      <path d="M17.5 17.5L23 23" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
    </svg>
  );
}

// Backspace key glyph.
export function DeleteGlyph({ size, class: className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      class={className}
    >
      <path
        d="M10 6H24A2 2 0 0 1 26 8V20A2 2 0 0 1 24 22H10L3 14Z"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linejoin="round"
      />
      <path
        d="M13 11L19 17M19 11L13 17"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
      />
    </svg>
  );
}
