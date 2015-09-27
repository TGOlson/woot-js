import R from 'ramda';

import WChar from './wchar';


const isDefined = R.complement(R.isNil);


// updateIdCache :: WCharId -> WString -> WString
const updateIdCache = ({clientId, clock}, wString) => {
  const cache = wString.__idCache || {};

  // a little mutation here
  // but it's worth it for the performance boosts
  cache[clientId] = cache[clientId] || {};
  cache[clientId][clock] = true;

  wString.__idCache = cache;

  return wString;
};


// makeWStringFromWChars :: [WChar] -> WString
const makeWStringFromWChars = (chars) => {
  const wString = R.insertAll(1, chars, [WChar.wCharBeginning, WChar.wCharEnding]);
  wString.__idCache = {};
  return R.reduce((s, {id}) => updateIdCache(id, s), wString, chars);
};


// makeEmptyWString :: WString
const makeEmptyWString = () => {
  return makeWStringFromWChars([]);
};


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
const insert = (i, wChar, wString) => {
  return updateIdCache(
    wChar.id, R.insert(i, wChar, wString)
  );
};


const isInCache = (id, wString) => {
  if (wString.__idCache) {
    const {clientId, clock} = id;
    // const inCache = R.path(['__idCache', clientId, clock], wString) === true;

    if (wString.__idCache && wString.__idCache[clientId] && wString.__idCache[clientId[clock]]) {
      return true;
    }
  }

  return false;
};


// indexOf :: WCharId -> WString -> Int | null
const indexOf = (id, wString) => {
  // TODO: use 'contains' first once that is more reliable
  const index = R.findIndex((wChar) => {
    return WChar.compareWCharIds(id, wChar.id) === 0;
  }, wString);

  return index === -1 ? null : index;
};


// contains :: WCharId -> WString -> Bool
const contains = (id, wString) => {
  return isInCache(id, wString) ? true : indexOf(id, wString) !== null;
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
    if (!wString[j]) {
      return null;
    }

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
  makeWStringFromWChars,

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
