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
var _arguments = arguments;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _wstring = require('./wstring');

var _wstring2 = _interopRequireDefault(_wstring);

var matchOperationType = function matchOperationType(dict) {
  return function (operation) {
    if (_ramda2['default'].has(operation.type, dict)) {
      return _ramda2['default'].prop(operation.type, dict).apply(null, _arguments);
    }

    throw new Error('Invalid operation type: ' + operation.type);
  };
};

// canIntegrate :: Operation -> WString -> Bool
// canIntegrate (Operation Insert _ wc) ws = all (`contains` ws) [wCharPrevId wc, wCharNextId wc]
// canIntegrate (Operation Delete _ wc) ws = contains (wCharId wc) ws
var canIntegrate = matchOperationType({
  insert: function insert(operation, wString) {
    var containsPrev = _wstring2['default'].contains(operation.wChar.prevId, wString);
    var containsNext = _wstring2['default'].contains(operation.wChar.nextId, wString);
    return containsPrev && containsNext;
  },
  'delete': function _delete(operation, wString) {
    return _wstring2['default'].contains(operation.wChar.id, wString);
  }
});

// integrateOp :: Operation -> WString -> WString
// integrateOp (Operation Insert _ wc) ws = integrateInsert (wCharPrevId wc) (wCharNextId wc) wc ws
// integrateOp (Operation Delete _ wc) ws = integrateDelete wc ws
var integrateOp = matchOperationType({
  insert: function insert(operation, wString) {
    return integrateInsert(operation.wChar.prevId, operation.wChar.nextId, wString);
  },
  'delete': function _delete(operation, wString) {
    return integrateDelete(operation.wChar, wString);
  }
});

// integrate :: Operation -> WString -> Maybe WString
// integrate op ws = if canIntegrate op ws then Just $ integrateOp op ws else Nothing
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
var integrateAll = function integrateAll(operation, wString) {};

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