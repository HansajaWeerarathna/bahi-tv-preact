import { describe, expect, it } from 'vitest';
import { ROUTES } from '@/shared/config';
import { findSearchItems, SEARCH_RESULT_LIMIT } from './search-items';

describe('findSearchItems', () => {
  it('finds the Emergency page by its English name', () => {
    expect(findSearchItems('emergency')[0]?.path).toBe(ROUTES.emergency);
  });

  it('finds the Emergency page by its Arabic name', () => {
    expect(findSearchItems('الطوارئ')[0]?.path).toBe(ROUTES.emergency);
  });

  it('ignores case', () => {
    expect(findSearchItems('WIFI')[0]?.path).toBe(ROUTES.wifi);
  });

  it('finds a request by a word a guest would type', () => {
    expect(
      findSearchItems('towels').some((item) => item.path.includes('/room-service/request/')),
    ).toBe(true);
  });

  it('shows the first pages as popular when the query is empty', () => {
    const popular = findSearchItems('   ');
    expect(popular).toHaveLength(SEARCH_RESULT_LIMIT);
    expect(popular[0]?.path).toBe(ROUTES.tv);
  });

  it('returns nothing for a word that matches nothing', () => {
    expect(findSearchItems('zzqx')).toEqual([]);
  });
});
