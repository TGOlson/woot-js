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
// import Data.Maybe
// import qualified Data.Vector as V
//
// import Data.Woot.WChar
//
//
// newtype WString = WString { wStringChars :: V.Vector WChar } deriving (Eq)
//
//
// instance Show WString where
//     -- get the visible characters, then remove any special characters
//     -- TODO: this could be more efficient by composing (init . tail) in vector form
//     -- (we know that the only special characters are at the beginning and end of the string)
//     show = map wCharAlpha . toList . visibleChars
//
//
// emptyWString :: WString
// emptyWString = fromList [wCharBeginning, wCharEnding]
//
//
// fromList :: [WChar] -> WString
// fromList = WString . V.fromList
//
//
// toList :: WString -> [WChar]
// toList = V.toList . wStringChars
//
//
// lengthWS :: WString -> Int
// lengthWS = V.length . wStringChars
//
//
// -- unsafe
// (!) :: WString -> Int -> WChar
// (!) ws n = wStringChars ws V.! n
//
//
// (!?) :: WString -> Int -> Maybe WChar
// (!?) ws n = wStringChars ws V.!? n
//
//
// indexOf :: WCharId -> WString -> Maybe Int
// indexOf wcid = V.findIndex ((==) wcid . wCharId) . wStringChars
//
//
// -- insert before index i
// -- insert 2 'x' "abc" -> abxc
// insert :: WChar -> Int -> WString -> WString
// insert wc i (WString wcs) = WString $ V.concat [V.take i wcs, V.singleton wc, V.drop i wcs]
//
//
// -- returns the subsequence between the two provided elements, both not included
// subsection :: WCharId -> WCharId -> WString -> WString
// subsection prev next ws = WString . fromMaybe V.empty $ do
//     i <- indexOf prev ws
//     j <- indexOf next ws
//     return $ slice' i (j - i) (wStringChars ws)
//   where
//     -- safe version of slice - returns empty when passed illegal indices
//     slice' i n = V.take n . V.drop i
//
//
// contains :: WCharId -> WString -> Bool
// contains wcid ws = isJust $ indexOf wcid ws
//
//
// visibleChars :: WString -> WString
// visibleChars = WString . V.filter wCharVisible . wStringChars
//
//
// nthVisible :: Int -> WString -> Maybe WChar
// nthVisible n = (!? n) . visibleChars
//
//
// isEmpty :: WString -> Bool
// isEmpty = V.null . wStringChars
//
//
// hideChar :: WCharId -> WString -> WString
// hideChar wid ws@(WString wcs) = WString $
//     maybe wcs (\i -> wcs V.// [(i, hide $ ws ! i)]) mindex
//   where
//     mindex = indexOf wid ws

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _wchar = require('./wchar');

var _wchar2 = _interopRequireDefault(_wchar);

var makeEmptyWString = _ramda2['default'].always([_wchar2['default'].beginningChar, _wchar2['default'].endingChar]);

var getVisibleChars = _ramda2['default'].filter(_ramda2['default'].propEq('isVisible', true));

var show = _ramda2['default'].compose(_ramda2['default'].join(''), _ramda2['default'].pluck('alpha'), getVisibleChars);

var insert = _ramda2['default'].insert;

var subsection = function subsection(idA, idB, wString) {
  var indexA = _ramda2['default'].findIndex(_ramda2['default'].propEq('id', idA), wString);
  var indexB = _ramda2['default'].findIndex(_ramda2['default'].propEq('id', idB), wString);

  if (indexA !== -1 && indexA < indexB) {
    return _ramda2['default'].slice(indexA, indexB, wString);
  }

  return [];
};

exports['default'] = {
  makeEmptyWString: makeEmptyWString,
  show: show,
  insert: insert,
  subsection: subsection
};
module.exports = exports['default'];
//# sourceMappingURL=../woot/wstring.js.map