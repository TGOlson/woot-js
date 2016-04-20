import R from 'ramda';

// import Package from '../package.json';

import * as Core from './woot/core';
import * as Operation from './woot/operation';
import * as WChar from './woot/wchar';
import * as WString from './woot/wstring';

type ClientId = number;

export type WootClient = {
  clientId: ClientId;
  clock: number;
  wString: WString.WString;
  operationQueue: Array<Operation.Operation>;
};

const incClock = (client: WootClient): WootClient =>
  ({ ...client, clock: client.clock + 1 });


export const showClientString = (client: WootClient): string =>
  WString.show(client.wString);


// TODO: this check if the client id already exists in the provided string
// and then start the client clock at the correct value.
export const makeWootClient = (wString: WString.WString, clientId: ClientId): WootClient => {
  return {
    clientId,
    clock: 0,
    wString,
    operationQueue: [],
  };
};


export const makeWootClientEmpty = (clientId: ClientId): WootClient =>
  makeWootClient(WString.makeEmptyWString(), clientId);


const updateOperationQueue = (
  operations: Array<Operation.Operation>,
  client: WootClient
): WootClient =>
  ({ ...client, operationQueue: operations });

const updateWString = (wString: WString.WString, client: WootClient): WootClient =>
  ({ ...client, wString });


// sends an operation to a woot client, returning a new woot client
// the operation will either be integrated into the woot client's string
// or it will be added to the client's interal operation queue to be tried again
export const sendOperation = (client: WootClient, operation: Operation.Operation): WootClient => {
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
// TODO: refactor with sendOperations - lots of similar functionality
const sendLocalOperation = (client: WootClient, operation: Operation.Operation) => {
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
export const sendLocalDelete = (
  client: WootClient,
  position: number
): { operation: ?Operation.Operation, client: WootClient } => {
  const maybeOp = Core.makeDeleteOperation(client.clientId, position, client.wString);

  return {
    operation: maybeOp,
    client: maybeOp ? sendLocalOperation(client, maybeOp) : client,
  };
};


export const sendLocalInsert = (
  client: WootClient,
  position: number,
  alpha: string
): { operation: ?Operation.Operation, client: WootClient } => {
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

// TODO: get from package.json
export const __version = '0.0.5';

// TODO: no default export
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
