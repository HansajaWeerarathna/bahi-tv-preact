import { signal } from '@preact/signals';

export type RoomControlsState = {
  lights: boolean;
  curtains: boolean;
  temperatureC: number;
  doNotDisturb: boolean;
};

export const MIN_TEMPERATURE_C = 20;
export const MAX_TEMPERATURE_C = 26;

// Changes live on this screen only until the room system is connected.
export const roomControls = signal<RoomControlsState>({
  lights: false,
  curtains: false,
  temperatureC: 22,
  doNotDisturb: false,
});

// Steps up one degree, wrapping back to the minimum after the maximum.
export function nextTemperature(current: number): number {
  return current >= MAX_TEMPERATURE_C ? MIN_TEMPERATURE_C : current + 1;
}

export function toggleLights(): void {
  roomControls.value = { ...roomControls.value, lights: !roomControls.value.lights };
}

export function toggleCurtains(): void {
  roomControls.value = { ...roomControls.value, curtains: !roomControls.value.curtains };
}

export function toggleDoNotDisturb(): void {
  roomControls.value = {
    ...roomControls.value,
    doNotDisturb: !roomControls.value.doNotDisturb,
  };
}

export function raiseTemperature(): void {
  roomControls.value = {
    ...roomControls.value,
    temperatureC: nextTemperature(roomControls.value.temperatureC),
  };
}
