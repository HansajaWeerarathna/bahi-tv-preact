const EDGE_TOLERANCE = 1;

const AXES = {
  left: { main: 'x', isAhead: (from, to) => to.right <= from.left + EDGE_TOLERANCE },
  right: { main: 'x', isAhead: (from, to) => to.left >= from.right - EDGE_TOLERANCE },
  up: { main: 'y', isAhead: (from, to) => to.bottom <= from.top + EDGE_TOLERANCE },
  down: { main: 'y', isAhead: (from, to) => to.top >= from.bottom - EDGE_TOLERANCE },
};

function mainGap(direction, from, to) {
  if (direction === 'left') return from.left - to.right;
  if (direction === 'right') return to.left - from.right;
  if (direction === 'up') return from.top - to.bottom;
  return to.top - from.bottom;
}

function crossOverlaps(main, from, to) {
  return main === 'x'
    ? to.top < from.bottom && to.bottom > from.top
    : to.left < from.right && to.right > from.left;
}

function crossCentreDistance(main, from, to) {
  return main === 'x'
    ? Math.abs((to.top + to.bottom) / 2 - (from.top + from.bottom) / 2)
    : Math.abs((to.left + to.right) / 2 - (from.left + from.right) / 2);
}

export function findNextFocus(direction, from, candidates) {
  const { main, isAhead } = AXES[direction];

  const ranked = candidates
    .filter((candidate) => isAhead(from.rect, candidate.rect))
    .map((candidate) => ({
      candidate,
      overlapRank: crossOverlaps(main, from.rect, candidate.rect) ? 0 : 1,
      gap: mainGap(direction, from.rect, candidate.rect),
      offset: crossCentreDistance(main, from.rect, candidate.rect),
    }))
    .sort((a, b) => a.overlapRank - b.overlapRank || a.gap - b.gap || a.offset - b.offset);

  return ranked[0]?.candidate ?? null;
}
