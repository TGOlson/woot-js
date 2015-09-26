// module Data.Woot.WString
//     ( WString
//     -- Construction
//     , emptyWString
//     , fromList
//     , toList
//
//     -- General WString operations
//     , lengthWS
//     , (!?)
//     , indexOf
//     , insert
//     , subsection
//     , contains
//     , isEmpty
//     , nthVisible
//
//     -- Special utilities
//     , hideChar
//     ) where
//
//
// nthVisible :: Int -> WString -> Maybe WChar
// nthVisible n = (!? n) . visibleChars
//
//
//
// hideChar :: WCharId -> WString -> WString
// hideChar wid ws@(WString wcs) = WString $
//     maybe wcs (\i -> wcs V.// [(i, hide $ ws ! i)]) mindex
//   where
//     mindex = indexOf wid ws

import R from 'ramda';

import WChar from './wchar';

// makeEmptyWString :: WString
const makeEmptyWString = R.always([WChar.beginningChar, WChar.endingChar]);

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

  if (indexA && indexB && (indexA < indexB)) {
    return R.slice(indexA + 1, indexB, wString);
  }

  return [];
};


// hideChar :: WCharId -> WString -> WString
const hideChar = (id, wString) => {
  const index = indexOf(id, wString);
  const wChar = WChar.hide(wString[index]);

  return index ? R.update(index, wChar, wString) : wString;
};
// hideChar wid ws@(WString wcs) = WString $
//     maybe wcs (\i -> wcs V.// [(i, hide $ ws ! i)]) mindex
//   where
//     mindex = indexOf wid ws

export default {
  makeEmptyWString,
  show,
  insert,
  subsection,
  contains,
  indexOf,
  hideChar
};
