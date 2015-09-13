// module Data.Woot.Core
//     ( integrate
//     , integrateAll
//     , makeDeleteOperation
//     , makeInsertOperation
//     ) where
//
//
// import Control.Applicative -- keep for ghc <7.10
// import Data.Maybe (fromJust)
//
// import Data.Woot.Operation
// import Data.Woot.WChar
// import Data.Woot.WString
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _wstring = require('./wstring');

var _wstring2 = _interopRequireDefault(_wstring);

// matchOperationType :: {OperationType: *} -> (Operation -> * | Error)
var matchOperationType = function matchOperationType(dict) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var type = _ramda2['default'].path(['0', 'type'], args);
    if (_ramda2['default'].has(type, dict)) {
      return _ramda2['default'].prop(type, dict).apply(null, args);
    }

    throw new Error('Invalid operation type: ' + type);
  };
};

// canIntegrate :: Operation -> WString -> Bool
var canIntegrate = matchOperationType({
  insert: function insert(wChar, wString) {
    var containsPrev = _wstring2['default'].contains(wChar.prevId, wString);
    var containsNext = _wstring2['default'].contains(wChar.nextId, wString);
    return containsPrev && containsNext;
  },
  'delete': function _delete(_ref, wString) {
    var wChar = _ref.wChar;

    return _wstring2['default'].contains(wChar.id, wString);
  }
});

// integrateOp :: Operation -> WString -> WString
var integrateOp = matchOperationType({
  insert: function insert(_ref2, wString) {
    var wChar = _ref2.wChar;

    return integrateInsert(wChar.prevId, wChar.nextId, wString);
  },
  'delete': function _delete(_ref3, wString) {
    var wChar = _ref3.wChar;

    return integrateDelete(wChar, wString);
  }
});

// integrate :: Operation -> WString -> WString | null
var integrate = function integrate(operation, wString) {
  return canIntegrate(operation, wString) ? integrateOp(operation, wString) : null;
};

//
// -- iterate through operation list until stable
// -- return any remaining operations, along with new string
// integrateAll :: [Operation] -> WString -> ([Operation], WString)
// integrateAll ops ws = if length ops == length newOps then result
//     else integrateAll newOps newString
//   where
//     result@(newOps, newString)  = foldl integrate' ([], ws) ops
//     integrate' (ops', s) op = maybe (ops' ++ [op], s) (ops',) (integrate op s)

// integrateAll :: [Operation] -> WString -> ([Operation], WString)
var integrateAll = function integrateAll(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var operations = _x,
        wString = _x2;
    integrate_ = _R$reduce = _R$reduce2 = newOps = s = undefined;
    _again = false;

    var integrate_ = function integrate_(_ref4, op) {
      var _ref42 = _slicedToArray(_ref4, 2);

      var ops = _ref42[0];
      var s = _ref42[1];

      var res = integrate(op, s);
      return res ? [ops, res] : [_ramda2['default'].append(op, ops), s];
    };

    var _R$reduce = _ramda2['default'].reduce(integrate_, [[], wString], operations);

    var _R$reduce2 = _slicedToArray(_R$reduce, 2);

    var newOps = _R$reduce2[0];
    var s = _R$reduce2[1];
    if (_ramda2['default'].length(operations) === _ramda2['default'].length(newOps)) {
      return [newOps, s];
    } else {
      _x = newOps;
      _x2 = s;
      _again = true;
      continue _function;
    }
  }
};

//
// integrateInsert :: WCharId -> WCharId -> WChar -> WString -> WString
// -- if char already exists
// integrateInsert _ _ wc ws | contains (wCharId wc) ws = ws
// integrateInsert prevId nextId wc ws = if isEmpty sub
//     -- should always be safe to get index and insert since we have flagged this as 'canIntegrate'
//     then insert wc (fromJust $ indexOf nextId ws) ws
//     else compareIds $ map wCharId (toList sub) ++ [nextId]
//   where
//     sub = subsection prevId nextId ws
//     compareIds :: [WCharId] -> WString
//     -- current id is less than the previous id
//     compareIds (wid:_) | wCharId wc < wid = insert wc (fromJust $ indexOf wid ws) ws
//      -- recurse to integrateInsert with next id in the subsection
//     compareIds (_:wid:_) = integrateInsert wid nextId wc ws
//     -- should never have a match fall through to here, but for good measure...
//     compareIds _  = ws
//
//
// integrateDelete :: WChar -> WString -> WString
// integrateDelete wc = hideChar (wCharId wc)
//
//
// makeDeleteOperation :: ClientId -> Int -> WString -> Maybe Operation
// makeDeleteOperation cid pos ws = Operation Delete cid <$> nthVisible pos ws
//
//
// -- position based of off visible characters only
// -- operations should only be concerned with the visible string
// makeInsertOperation :: WCharId -> Int -> Char -> WString -> Maybe Operation
// makeInsertOperation (WCharId cid clock) pos a ws = Operation Insert cid <$> do
//     let numVis = length $ show ws
//
//     -- first check if we are trying to insert at the very beginning of the string
//     prev <- if pos == 0 then beginningChar else nthVisible (pos - 1) ws
//
//     -- also see if the insert is being done at the very end of the string
//     next <- if pos == numVis then endingChar else nthVisible pos ws
//     return $ WChar (WCharId cid clock) True a (wCharId prev) (wCharId next)
//   where
//     beginningChar = ws !? 0
//     endingChar = ws !? (lengthWS ws - 1)

exports['default'] = {
  integrate: integrate,
  integrateAll: integrateAll
};
module.exports = exports['default'];
//# sourceMappingURL=../woot/core.js.map