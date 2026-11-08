const DAY_MS = 86_400_000;

// Whole nights between two ISO dates (YYYY-MM-DD). Never negative.
export function countNights(checkInDate: string, checkOutDate: string): number {
  const start = new Date(`${checkInDate}T00:00:00`).getTime();
  const end = new Date(`${checkOutDate}T00:00:00`).getTime();
  return Math.max(0, Math.round((end - start) / DAY_MS));
}

// Dates are shown as "1 Nov 2026", as in the original.
export function formatStayDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
