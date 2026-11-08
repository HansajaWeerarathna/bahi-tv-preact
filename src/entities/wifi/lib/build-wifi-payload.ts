const SPECIAL_CHARACTERS = /[\\;,:"]/g;

function escapeField(value: string): string {
  return value.replace(SPECIAL_CHARACTERS, '\\$&');
}

// The text a phone camera reads to join a Wi-Fi network (the WIFI: format).
export function buildWifiPayload(ssid: string, password: string, security: string): string {
  return `WIFI:T:${security};S:${escapeField(ssid)};P:${escapeField(password)};;`;
}
