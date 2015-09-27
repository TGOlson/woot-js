import R from 'ramda';

import WChar from './wchar';


const isDefined = R.complement(R.isNil);


// makeEmptyWString :: WString
const makeEmptyWString = () => [WChar.wCharBeginning, WChar.wCharEnding];


// show :: WString -> String
const show = (wString) => {
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
const insert = R.insert;


// indexOf :: WCharId -> WString -> Int | null
const indexOf = (id, wString) => {
  const index = R.findIndex((wChar) => {
    return WChar.compareWCharIds(id, wChar.id) === 0;
  }, wString);

  return index === -1 ? null : index;
};


// contains :: WCharId -> WString -> Bool
const contains = (id, wString) => {
  return indexOf(id, wString) !== null;
};


// subsection :: WCharId -> WCharId -> WString -> WString
const subsection = (idA, idB, wString) => {
  const indexA = indexOf(idA, wString);
  const indexB = indexOf(idB, wString);

  if (isDefined(indexA) && isDefined(indexB) && (indexA < indexB)) {
    return R.slice(indexA + 1, indexB, wString);
  }

  return [];
};


// nthVisible :: Int -> WString -> WChar | null
const nthVisible = (i, wString) => {
  let numFound = 0;
  let j = 0;

  if (i > wString.length) {
    return null;
  }

  for (; numFound < i + 1; j++) {
    if (wString[j].isVisible) {
      numFound++;
    }
  }

  return wString[j - 1];
};


// hideChar :: WCharId -> WString -> WString
const hideChar = (id, wString) => {
  const index = indexOf(id, wString);
  const wChar = WChar.hide(wString[index]);

  return index ? R.update(index, wChar, wString) : wString;
};


export default {
  // Construction
  makeEmptyWString,

  // General WString operations
  show,
  indexOf,
  insert,
  subsection,
  contains,
  nthVisible,

  // Special utilities
  hideChar
};
