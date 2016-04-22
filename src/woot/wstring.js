import R from 'ramda';

import type { Optional } from '../types';
import type { WChar, WCharId } from './wchar';

import {
  wCharBeginning,
  wCharEnding,
  compareWCharIds,
  hide,
} from './wchar';

export type WString = Array<WChar>;

export const makeEmptyWString = (): WString => [wCharBeginning, wCharEnding];


export const show = (wString: WString): string => {
  let i = 0;
  let str = '';

  for (; i < wString.length; i++) {
    if (wString[i].isVisible) {
      str += wString[i].alpha;
    }
  }

  return str;
};


// -- insert before index i
// -- insert 2 'x' "abc" -> abxc
export const insert = R.insert;


export const indexOf = (id: WCharId, wString: WString): Optional<number> => {
  const index = R.findIndex(wChar => compareWCharIds(id, wChar.id) === 'EQ', wString);

  return index === -1 ? null : index;
};


export const contains = (id: WCharId, wString: WString): boolean => {
  return indexOf(id, wString) !== null;
};


export const subsection = (idA: WCharId, idB: WCharId, wString: WString): WString => {
  const indexA = indexOf(idA, wString);
  const indexB = indexOf(idB, wString);

  if (indexA === null || indexB === null || indexA > indexB) {
    return [];
  }

  return R.slice(indexA + 1, indexB, wString);
};


export const nthVisible = (i: number, wString: WString): Optional<WChar> => {
  let numFound = 0;
  let j = 0;

  if (i > wString.length) {
    return null;
  }

  for (; numFound < i + 1; j++) {
    if (!wString[j]) {
      return null;
    }

    if (wString[j].isVisible) {
      numFound++;
    }
  }

  return wString[j - 1] || null;
};


export const hideChar = (id: WCharId, wString: WString): WString => {
  const index = indexOf(id, wString);

  return index ? R.update(index, hide(wString[index]), wString) : wString;
};
