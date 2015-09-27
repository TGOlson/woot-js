import R from 'ramda';

import WChar from './wchar';


const isDefined = R.complement(R.isNil);


// makeEmptyWString :: WString
const makeEmptyWString = () => [WChar.wCharBeginning, WChar.wCharEnding];


// getVisibleChars :: WString -> WString
const getVisibleChars = R.filter(R.propEq('isVisible', true));


// show :: WString -> String
const show = R.compose(
  R.join(''),
  R.pluck('alpha'),
  getVisibleChars
);


// -- insert before index i
// -- insert 2 'x' "abc" -> abxc
// insert :: Int -> WChar -> WString -> WString
const insert = R.insert;


// indexOf :: WCharId -> WString -> Int | null
const indexOf = (id, wString) => {
  const index = R.findIndex(R.propEq('id', id), wString);
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
  return getVisibleChars(wString)[i];
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
