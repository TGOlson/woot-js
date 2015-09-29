'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _wchar = require('./wchar');

var _wchar2 = _interopRequireDefault(_wchar);

var isDefined = _ramda2['default'].complement(_ramda2['default'].isNil);

// updateIdCache :: WCharId -> WString -> WString
var updateIdCache = function updateIdCache(_ref, wString) {
  var clientId = _ref.clientId;
  var clock = _ref.clock;

  var cache = wString.__idCache || {};

  // a little mutation here
  // but it's worth it for the performance boosts
  cache[clientId] = cache[clientId] || {};
  cache[clientId][clock] = true;

  wString.__idCache = cache;

  return wString;
};

// hacky way to stop standard array ops from removing cache
// TODO: redo wString data type
var withIdCache = function withIdCache(fn, wString) {
  var newString = fn(wString);
  newString.__idCache = wString.__idCache;
  return newString;
};

// makeWStringFromWChars :: [WChar] -> WString
var makeWStringFromWChars = function makeWStringFromWChars(chars) {
  var wString = _ramda2['default'].insertAll(1, chars, [_wchar2['default'].wCharBeginning, _wchar2['default'].wCharEnding]);
  wString.__idCache = {};
  return _ramda2['default'].reduce(function (s, _ref2) {
    var id = _ref2.id;
    return updateIdCache(id, s);
  }, wString, wString);
};

// makeEmptyWString :: WString
var makeEmptyWString = function makeEmptyWString() {
  return makeWStringFromWChars([]);
};

// show :: WString -> String
var show = function show(wString) {
  var i = 0;
  var str = '';

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
var insert = function insert(i, wChar, wString) {
  return updateIdCache(wChar.id, withIdCache(_ramda2['default'].insert(i, wChar), wString));
};

var isInCache = function isInCache(_ref3, wString) {
  var clientId = _ref3.clientId;
  var clock = _ref3.clock;

  return _ramda2['default'].path(['__idCache', clientId, clock], wString) !== undefined;
};

// indexOf :: WCharId -> WString -> Int | null
var indexOf = function indexOf(id, wString) {
  // TODO: use 'contains' first once that is more reliable
  if (isInCache(id, wString)) {
    return _ramda2['default'].findIndex(function (wChar) {
      return _wchar2['default'].compareWCharIds(id, wChar.id) === 0;
    }, wString);
  }

  return null;
};

// contains :: WCharId -> WString -> Bool
var contains = function contains(id, wString) {
  return isInCache(id, wString);
};

// subsection :: WCharId -> WCharId -> WString -> WString
var subsection = function subsection(idA, idB, wString) {
  var indexA = indexOf(idA, wString);
  var indexB = indexOf(idB, wString);

  if (isDefined(indexA) && isDefined(indexB) && indexA < indexB) {
    return withIdCache(_ramda2['default'].slice(indexA + 1, indexB), wString);
  }

  return [];
};

// nthVisible :: Int -> WString -> WChar | null
var nthVisible = function nthVisible(i, wString) {
  var numFound = 0;
  var j = 0;

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
var hideChar = function hideChar(id, wString) {
  var index = indexOf(id, wString);
  var wChar = _wchar2['default'].hide(wString[index]);

  return index ? withIdCache(_ramda2['default'].update(index, wChar), wString) : wString;
};

exports['default'] = {
  // Construction
  makeEmptyWString: makeEmptyWString,
  makeWStringFromWChars: makeWStringFromWChars,

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