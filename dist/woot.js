'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _wootCore = require('./woot/core');

var _wootCore2 = _interopRequireDefault(_wootCore);

var _wootOperation = require('./woot/operation');

var _wootOperation2 = _interopRequireDefault(_wootOperation);

var _wootWchar = require('./woot/wchar');

var _wootWchar2 = _interopRequireDefault(_wootWchar);

var _wootWstring = require('./woot/wstring');

var _wootWstring2 = _interopRequireDefault(_wootWstring);

// incClock :: WootClient -> WootClient
var incClock = _ramda2['default'].evolve({ clock: _ramda2['default'].inc });

// showClientString :: WootClient -> String
var showClientString = _ramda2['default'].compose(

// Re-export sub modules
_wootWstring2['default'].show, _ramda2['default'].prop('wString'));

// TODO: should this check if the client id already exists in the provided string
// and then start the client clock at the correct value?
// makeWootClient :: WString -> ClientId -> WootClient
var makeWootClient = _ramda2['default'].curry(function (wString, clientId) {
  return {
    clientId: clientId,
    clock: 0,
    wString: wString,
    operationQueue: []
  };
});

// makeWootClientEmpty :: ClientId -> WootClient
var makeWootClientEmpty = makeWootClient(_wootWstring2['default'].makeEmptyWString());

// updateOperationQueue :: [Operation] -> WootClient -> WootClient
var updateOperationQueue = _ramda2['default'].assoc('operationQueue');

// updateWString :: WString -> WootClient -> WootClient
var updateWString = _ramda2['default'].assoc('wString');

// sends an operation to a woot client, returning a new woot client
// the operation will either be integrated into the woot client's string
// or it will be added to the client's interal operation queue to be tried again
// sendOperation :: WootClient -> Operation -> WootClient
var sendOperation = function sendOperation(client, operation) {
  var operations = _ramda2['default'].append(operation, client.operationQueue);
  var result = _wootCore2['default'].integrateAll(operations, client.wString);

  return updateWString(result.wString, updateOperationQueue(result.operations, client));
};

// sendOperations :: WootClient -> [Operation] -> WootClient
var sendOperations = _ramda2['default'].reduce(sendOperation);

// identical to sendOperation, but increments the clients internal clock
// not exposed - consumers should use sendLocalDelete or sendLocalInsert
// sendLocalOperation :: WootClient -> Operation -> WootClient
// TODO: refactor with sendOperations - lots of similar functionality
var sendLocalOperation = function sendLocalOperation(client, operation) {
  var operations = _ramda2['default'].append(operation, client.operationQueue);
  var result = _wootCore2['default'].integrateAllLocal(operations, client.wString);

  return incClock(updateWString(result.wString, updateOperationQueue(result.operations, client)));
};

// -- note: failed local operations can result in no-ops if the underlying operation is invalid
// -- they will not be added to a client's operation queue
// -- the assumption is that anything done locally should already be verified
// -- if the local operation was successful, the operation should be broadcasted to other clients
// sendLocalDelete :: WootClient -> Int -> {operation: Operation | null, client: WootClient}
var sendLocalDelete = function sendLocalDelete(client, position) {
  var maybeOp = _wootCore2['default'].makeDeleteOperation(client.clientId, position, client.wString);

  return {
    operation: maybeOp,
    client: maybeOp ? sendLocalOperation(client, maybeOp) : client
  };
};

// sendLocalInsert :: WootClient -> Int -> Char -> {operation: Operation | null, client: WootClient}
var sendLocalInsert = function sendLocalInsert(client, position, alpha) {
  var wCharId = _wootWchar2['default'].makeWCharId(client.clientId, client.clock);
  var maybeOp = _wootCore2['default'].makeInsertOperation(wCharId, position, alpha, client.wString);

  return {
    operation: maybeOp,
    client: maybeOp ? sendLocalOperation(client, maybeOp) : client
  };
};

exports['default'] = {
  // Construction
  makeWootClient: makeWootClient,
  makeWootClientEmpty: makeWootClientEmpty,

  // Operation Handling
  sendOperation: sendOperation,
  sendOperations: sendOperations,
  sendLocalDelete: sendLocalDelete,
  sendLocalInsert: sendLocalInsert,

  // Utility functions
  showClientString: showClientString, WString: _wootWstring2['default'],
  WChar: _wootWchar2['default'],
  Operation: _wootOperation2['default'],

  // meta meta
  __version: '0.0.5'
};
module.exports = exports['default'];
//# sourceMappingURL=woot.js.map