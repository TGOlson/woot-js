'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _wchar = require('./wchar');

var _wchar2 = _interopRequireDefault(_wchar);

// makeEmptyWString :: WString
var makeEmptyWString = function makeEmptyWString() {
  return [_wchar2['default'].wCharBeginning, _wchar2['default'].wCharEnding];
};

// getVisibleChars :: WString -> WString
var getVisibleChars = _ramda2['default'].filter(_ramda2['default'].propEq('isVisible', true));

// show :: WString -> String
var show = _ramda2['default'].compose(_ramda2['default'].join(''), _ramda2['default'].pluck('alpha'), getVisibleChars);

// -- insert before index i
// -- insert 2 'x' "abc" -> abxc
// insert :: Int -> WChar -> WString -> WString
var insert = _ramda2['default'].insert;

// indexOf :: WCharId -> WString -> Int | null
var indexOf = function indexOf(id, wString) {
  var index = _ramda2['default'].findIndex(_ramda2['default'].propEq('id', id), wString);
  return index === -1 ? null : index;
};

// contains :: WCharId -> WString -> Bool
var contains = function contains(id, wString) {
  return indexOf(id, wString) !== null;
};

// subsection :: WCharId -> WCharId -> WString -> WString
var subsection = function subsection(idA, idB, wString) {
  var indexA = indexOf(idA, wString);
  var indexB = indexOf(idB, wString);

  if (indexA && indexB && indexA < indexB) {
    return _ramda2['default'].slice(indexA + 1, indexB, wString);
  }

  return [];
};

// nthVisible :: Int -> WString -> WChar | null
var nthVisible = function nthVisible(i, wString) {
  return getVisibleChars(wString)[i];
};

// hideChar :: WCharId -> WString -> WString
var hideChar = function hideChar(id, wString) {
  var index = indexOf(id, wString);
  var wChar = _wchar2['default'].hide(wString[index]);

  return index ? _ramda2['default'].update(index, wChar, wString) : wString;
};

exports['default'] = {
  // Construction
  makeEmptyWString: makeEmptyWString,

  // General WString operations
  show: show,
  indexOf: indexOf,
  insert: insert,
  subsection: subsection,
  contains: contains,
  nthVisible: nthVisible,

  // Special utilities
  hideChar: hideChar
};
module.exports = exports['default'];
//# sourceMappingURL=../woot/wstring.js.map