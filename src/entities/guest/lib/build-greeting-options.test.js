import { afterEach, describe, expect, it } from 'vitest';
import { language } from '@/shared/i18n';
import { buildGreetingOptions, getTimeOfDay } from './build-greeting-options';

const SILVA = { title: 'mr', firstName: '', lastName: 'Silva', roomNumber: '412' };
const NADIA = { title: '', firstName: 'Nadia', lastName: 'Perera', roomNumber: '412' };
const ANNA = { title: 'ms', firstName: 'Anna', lastName: 'Lee', roomNumber: '412' };

afterEach(() => {
  language.value = 'en';
});

describe('getTimeOfDay', () => {
  it('switches greeting at the hour boundaries', () => {
    expect(getTimeOfDay(4)).toBe('night');
    expect(getTimeOfDay(5)).toBe('morning');
    expect(getTimeOfDay(11)).toBe('morning');
    expect(getTimeOfDay(12)).toBe('afternoon');
    expect(getTimeOfDay(17)).toBe('afternoon');
    expect(getTimeOfDay(18)).toBe('evening');
    expect(getTimeOfDay(21)).toBe('evening');
    expect(getTimeOfDay(22)).toBe('night');
  });
});

describe('buildGreetingOptions', () => {
  it('greets a guest with a title and last name in the evening', () => {
    expect(buildGreetingOptions(SILVA, 20)[0]).toBe('Good evening, Mr. Silva');
  });

  it('offers a full name, a short name and the bare short name', () => {
    expect(buildGreetingOptions(ANNA, 9)).toEqual([
      'Good morning, Ms. Anna Lee',
      'Good morning, Ms. Lee',
      'Ms. Lee',
    ]);
  });

  it('puts the full name first when there is no title', () => {
    expect(buildGreetingOptions(NADIA, 14)[0]).toBe('Good afternoon, Nadia Perera');
  });

  it('welcomes the room when the guest has no name', () => {
    const unnamed = { title: '', firstName: '', lastName: '', roomNumber: '412' };
    expect(buildGreetingOptions(unnamed, 14)).toEqual(['Welcome to Room 412']);
  });

  it('uses the Arabic title and comma in Arabic', () => {
    language.value = 'ar';
    expect(buildGreetingOptions(SILVA, 20)[0]).toBe('مساء الخير، السيد Silva');
  });
});
