// module Data.Woot
//     ( WootClient
//     , wootClientId
//     , wootClientClock
//     , wootClientString
//     , wootClientOperationQueue
//
//     -- Construction
//     , makeWootClient
//     , makeWootClientEmpty
//
//     -- Operation handling
//     , sendOperation
//     , sendOperations
//     , sendLocalDelete
//     , sendLocalInsert
//
//     -- Useful data types from other modules
//     , WString
//     , WChar(..)
//     , WCharId(..)
//     , Operation(..)
//     , ClientId
//     ) where

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _wootCore = require('./woot/core');

var _wootCore2 = _interopRequireDefault(_wootCore);

var _wootWstring = require('./woot/wstring');

var _wootWstring2 = _interopRequireDefault(_wootWstring);

//
// import Data.Woot.Core
// import Data.Woot.Operation
// import Data.Woot.WChar
// import Data.Woot.WString
//
//
// data WootClient = WootClient
//     { wootClientId             :: Int
//     , wootClientClock          :: Int
//     , wootClientString         :: WString
//     , wootClientOperationQueue :: [Operation]
//     } deriving (Eq, Show)
//
//
// incClock :: WootClient -> WootClient
// incClock client = client {wootClientClock = succ $ wootClientClock client}
//
//
// -- TODO: should this check is the client id already exists in the provided string
// -- and then start the client clock at the correct value?
// makeWootClient :: WString -> ClientId -> WootClient
// makeWootClient ws cid = WootClient cid 0 ws []
var makeWootClient = _ramda2['default'].curry(function (wString, clientId) {
  return {
    clientId: clientId,
    clock: 0,
    wString: wString,
    operationQueue: []
  };
});

var makeWootClientEmpty = makeWootClient(_wootWstring2['default'].makeEmptyWString());

//
// makeWootClientEmpty :: ClientId -> WootClient
// makeWootClientEmpty = makeWootClient emptyWString
//

var updateOperations = _ramda2['default'].assoc('operations');
var updateWString = _ramda2['default'].assoc('wString');
//
// -- sends an operation to a woot client, returning a new woot client
// -- the operation will either be integrated into the woot client's string
// -- or it will be added to the client's interal operation queue to be tried again
// sendOperation :: WootClient -> Operation -> WootClient
// sendOperation (WootClient cid clock ws ops) op = WootClient cid clock ws' ops'
//     where
//       (ops', ws') = integrateAll (op:ops) ws
var sendOperation = function sendOperation(client, operation) {
  var operations = _ramda2['default'].append(operation, client.operations);
  var result = _wootCore2['default'].integrateAll(operations, client.wString);

  return updateWString(result.wString, updateOperations(result.operations, client));
};
//
// sendOperations :: WootClient -> [Operation] -> WootClient
// sendOperations = foldl sendOperation
//
//
// -- identical to sendOperation, but increments the clients internal clock
// -- not exposed - consumers should use sendLocalDelete or sendLocalInsert
// sendLocalOperation :: WootClient -> Operation -> WootClient
// sendLocalOperation client = incClock . sendOperation client
//
//
// -- note: failed local operations can result in no-ops if the underlying operation is invalid
// -- they will not be added to a client's operation queue
// -- the assumption is that anything done locally should already be verified
// -- if the local operation was successful, the operation should be broadcasted to other clients
// sendLocalDelete :: WootClient -> Int -> (Maybe Operation, WootClient)
// sendLocalDelete client pos = (op,) $ maybe client (sendLocalOperation client) op
//   where
//     op = makeDeleteOperation (wootClientId client) pos (wootClientString client)
//
//
// sendLocalInsert :: WootClient -> Int -> Char -> (Maybe Operation, WootClient)
// sendLocalInsert client@(WootClient cid clock ws _) pos a =
//     (op,) $ maybe client (sendLocalOperation client) op
//   where
//     op = makeInsertOperation (WCharId cid clock) pos a ws

exports['default'] = {
  makeWootClient: makeWootClient,
  makeWootClientEmpty: makeWootClientEmpty,
  sendOperation: sendOperation
};
module.exports = exports['default'];
//# sourceMappingURL=woot.js.map