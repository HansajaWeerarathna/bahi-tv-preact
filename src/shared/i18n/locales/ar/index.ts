import type { Dictionary } from '../../types';
import { arA } from './a';
import { arB } from './b';

export const ar: Dictionary = { ...arA, ...arB };
