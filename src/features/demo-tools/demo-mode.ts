export const isDemoMode =
  import.meta.env.DEV || new URLSearchParams(window.location.search).has('demo');
