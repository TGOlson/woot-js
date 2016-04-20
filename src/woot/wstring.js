import R from 'ramda';

import * as WChar from './wchar';

export type WString = Array<WChar.WChar>;

export const makeEmptyWString = (): WString => [WChar.wCharBeginning, WChar.wCharEnding];


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
// insert :: Int -> WChar -> WString -> WString
export const insert = R.insert;


export const indexOf = (id: WChar.WCharId, wString: WString): ?number => {
  const index = R.findIndex((wChar) => {
    return WChar.compareWCharIds(id, wChar.id) === 0;
  }, wString);

  return index === -1 ? null : index;
};


export const contains = (id: WChar.WCharId, wString: WString): boolean => {
  return indexOf(id, wString) !== null;
};


export const subsection = (idA: WChar.WCharId, idB: WChar.WCharId, wString: WString): WString => {
  const indexA = indexOf(idA, wString);
  const indexB = indexOf(idB, wString);

  if (indexA && indexB && (indexA < indexB)) {
    return R.slice(indexA + 1, indexB, wString);
  }

  return [];
};


export const nthVisible = (i: number, wString: WString): ?WChar.WChar => {
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

  return wString[j - 1];
};


export const hideChar = (id: WChar.WCharId, wString: WString): WString => {
  const index = indexOf(id, wString);

  return index ? R.update(index, WChar.hide(wString[index]), wString) : wString;
};
