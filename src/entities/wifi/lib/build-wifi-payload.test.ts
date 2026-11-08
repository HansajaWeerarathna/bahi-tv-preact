import { describe, expect, it } from 'vitest';
import { buildWifiPayload } from './build-wifi-payload';

describe('buildWifiPayload', () => {
  it('builds the payload for a WPA network', () => {
    expect(buildWifiPayload('Bahi_Guest_5G', 'palace-beach-412', 'WPA')).toBe(
      'WIFI:T:WPA;S:Bahi_Guest_5G;P:palace-beach-412;;',
    );
  });

  it('escapes the characters that separate fields', () => {
    expect(buildWifiPayload('a;b', 'x:y,"z"\\', 'WPA')).toBe(
      'WIFI:T:WPA;S:a\\;b;P:x\\:y\\,\\"z\\"\\\\;;',
    );
  });
});
