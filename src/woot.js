import R from 'ramda';


import * as Core from './woot/core';
import * as Operation from './woot/operation';
import * as WChar from './woot/wchar';
import * as WString from './woot/wstring';


// incClock :: WootClient -> WootClient
const incClock = R.evolve({clock: R.inc});


// showClientString :: WootClient -> String
export const showClientString = R.compose(
  WString.show,
  R.prop('wString')
);


// TODO: should this check if the client id already exists in the provided string
// and then start the client clock at the correct value?
// makeWootClient :: WString -> ClientId -> WootClient
export const makeWootClient = R.curry((wString, clientId) => {
  return {
    clientId,
    clock: 0,
    wString,
    operationQueue: [],
  };
});


// makeWootClientEmpty :: ClientId -> WootClient
export const makeWootClientEmpty = makeWootClient(WString.makeEmptyWString());


// updateOperationQueue :: [Operation] -> WootClient -> WootClient
const updateOperationQueue = R.assoc('operationQueue');

// updateWString :: WString -> WootClient -> WootClient
const updateWString = R.assoc('wString');


// sends an operation to a woot client, returning a new woot client
// the operation will either be integrated into the woot client's string
// or it will be added to the client's interal operation queue to be tried again
// sendOperation :: WootClient -> Operation -> WootClient
export const sendOperation = (client, operation) => {
  const operations = R.append(operation, client.operationQueue);
  const result = Core.integrateAll(operations, client.wString);

  return updateWString(result.wString,
    updateOperationQueue(result.operations, client)
  );
};


// sendOperations :: WootClient -> [Operation] -> WootClient
export const sendOperations = R.reduce(sendOperation);


// identical to sendOperation, but increments the clients internal clock
// not exposed - consumers should use sendLocalDelete or sendLocalInsert
// sendLocalOperation :: WootClient -> Operation -> WootClient
// TODO: refactor with sendOperations - lots of similar functionality
const sendLocalOperation = (client, operation) => {
  const operations = R.append(operation, client.operationQueue);
  const result = Core.integrateAllLocal(operations, client.wString);

  return incClock(
    updateWString(result.wString,
      updateOperationQueue(result.operations, client)
    )
  );
};


// -- note: failed local operations can result in no-ops if the underlying operation is invalid
// -- they will not be added to a client's operation queue
// -- the assumption is that anything done locally should already be verified
// -- if the local operation was successful, the operation should be broadcasted to other clients
// sendLocalDelete :: WootClient -> Int -> {operation: Operation | null, client: WootClient}
export const sendLocalDelete = (client, position) => {
  const maybeOp = Core.makeDeleteOperation(client.clientId, position, client.wString);

  return {
    operation: maybeOp,
    client: maybeOp ? sendLocalOperation(client, maybeOp) : client,
  };
};


// sendLocalInsert :: WootClient -> Int -> Char -> {operation: Operation | null, client: WootClient}
export const sendLocalInsert = (client, position, alpha) => {
  const wCharId = WChar.makeWCharId(client.clientId, client.clock);
  const maybeOp = Core.makeInsertOperation(wCharId, position, alpha, client.wString);

  return {
    operation: maybeOp,
    client: maybeOp ? sendLocalOperation(client, maybeOp) : client,
  };
};

export {
  WString,
  WChar,
  Operation,
};

export const __version = '0.0.5';

export default {
  // Construction
  makeWootClient,
  makeWootClientEmpty,

  // Operation Handling
  sendOperation,
  sendOperations,
  sendLocalDelete,
  sendLocalInsert,

  // Utility functions
  showClientString,

  // Re-export sub modules
  WString,
  WChar,
  Operation,

  // meta meta
  __version: '0.0.5',
};
